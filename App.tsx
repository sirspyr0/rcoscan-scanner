import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

interface Call {
  _id: string;
  time: string;
  talkgroupNum: number;
  len: number;
  freq: number;
  url: string;
  emergency: boolean;
  filename: string;
}

interface Talkgroup {
  _id: string;
  num: number;
  alpha: string;
  description: string;
}

export default function App() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [talkgroups, setTalkgroups] = useState<{ [key: number]: Talkgroup }>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingCallId, setPlayingCallId] = useState<string | null>(null);

  const fetchTalkgroups = async () => {
    try {
      const response = await fetch('https://api.openmhz.com/rcoscan/talkgroups');
      const data = await response.json();
      // Convert the talkgroups object to a map keyed by number
      const tgMap: { [key: number]: Talkgroup } = {};
      Object.values(data.talkgroups).forEach((tg: any) => {
        tgMap[tg.num] = tg;
      });
      setTalkgroups(tgMap);
    } catch (error) {
      console.error('Error fetching talkgroups:', error);
    }
  };

  const fetchCalls = async () => {
    try {
      // OpenMHZ API endpoint for a specific system's calls
      const response = await fetch('https://api.openmhz.com/rcoscan/calls/newer?time=0');
      
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      setCalls(Array.isArray(data) ? data : data.calls || []);
    } catch (error) {
      console.error('Error fetching calls:', error);
      // Set empty array on error so UI shows "No calls available"
      setCalls([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTalkgroups();
    fetchCalls();
    const interval = setInterval(fetchCalls, 10000); // Refresh every 10 seconds
    return () => {
      clearInterval(interval);
      // Clean up sound on unmount
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCalls();
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const formatDuration = (seconds: number) => {
    return `${seconds}s`;
  };

  const getTalkgroupName = (num: number): string => {
    const tg = talkgroups[num];
    if (tg) {
      return tg.description || tg.alpha || `Talkgroup ${num}`;
    }
    return `Talkgroup ${num}`;
  };

  const playAudio = async (call: Call) => {
    try {
      // If already playing this call, stop it
      if (playingCallId === call._id && sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setPlayingCallId(null);
        return;
      }

      // If playing a different call, stop it first
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      // Load and play the new audio
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: call.url },
        { shouldPlay: true }
      );

      setSound(newSound);
      setPlayingCallId(call._id);

      // Set up playback status update to detect when audio finishes
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setPlayingCallId(null);
          setSound(null);
        }
      });
    } catch (error) {
      console.error('Error playing audio:', error);
      setPlayingCallId(null);
      setSound(null);
    }
  };

  const renderCall = ({ item }: { item: Call }) => {
    const isPlaying = playingCallId === item._id;
    
    return (
      <View style={styles.callItem}>
        <View style={styles.callHeader}>
          <Text style={styles.talkgroupTag}>TG {item.talkgroupNum}</Text>
          <Text style={styles.time}>{formatTime(item.time)}</Text>
        </View>
        <Text style={styles.description}>{getTalkgroupName(item.talkgroupNum)}</Text>
        <View style={styles.callFooter}>
          <Text style={styles.duration}>{formatDuration(item.len)}</Text>
          <Text style={styles.freq}>{(item.freq / 1000000).toFixed(4)} MHz</Text>
        </View>
        <TouchableOpacity 
          style={[styles.playButton, isPlaying && styles.playButtonActive]} 
          onPress={() => playAudio(item)}
        >
          <Text style={styles.playButtonText}>{isPlaying ? '⏸ Stop' : '▶ Play'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading calls...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>RCOSCAN Scanner Feed</Text>
        <Text style={styles.headerSubtitle}>Riverside County, CA</Text>
      </View>
      <FlatList
        data={calls}
        renderItem={renderCall}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No calls available</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 2,
  },
  listContainer: {
    padding: 10,
  },
  callItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  callHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  talkgroup: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 2,
  },
  talkgroupNum: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  callFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  duration: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  freq: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  talkgroupTag: {
    fontSize: 14,
    fontWeight: '700',
    color: '#007AFF',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  playButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  playButtonActive: {
    backgroundColor: '#FF3B30',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
