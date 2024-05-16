import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Surface } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, ScrollView, Pressable, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Simulated fetch function for statistics
const fetchStatistics = () => {
  return Promise.resolve({
    lands: [
      { region: 'North', total: 5, averagePrice: 100000 },
      { region: 'South', total: 3, averagePrice: 150000 }
    ],
    houses: [
      { region: 'East', total: 10, averagePrice: 250000 },
      { region: 'West', total: 8, averagePrice: 200000 }
    ]
  });
};

// Component to display statistics


// Component for individual action items
const Action = ({ icon, title, onPress }) => (
  <Pressable onPress={onPress}>
    <View style={styles.action}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={23} color={'white'} />
        </View>
        <Icon name={'chevron-right'} size={25} color={'#15273F'} />
      </View>
      <Icon name={'chevron-right'} size={25} color={'#15273F'} />
    </View>
  </Pressable>
);

// Main user profile component
const UserProfile = ({ navigation }) => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    fetchStatistics().then(setStatistics);
  }, []);
  const [activeTab, setActiveTab] = useState('Week');
  const [somme, setSomme] = useState(0);
  const [nawsomme, setNawsomme] = useState(0);
  console.log(nawsomme);
  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('IdUser');
      const storedBalance = await AsyncStorage.getItem(`PAYMENT_AMOUNT_${userId}`);

      if (storedBalance !== null) {
        setSomme(parseFloat(storedBalance));
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Update AsyncStorage with the new sum whenever nawsomme changes
    async function updateAsyncStorage() {
      try {
        const userId = await AsyncStorage.getItem('IdUser');
        const oldStoredBalance = await AsyncStorage.getItem(`PAYMENT_AMOUNT_${userId}`);
        const oldSomme = parseFloat(oldStoredBalance) || 0;
        const newSomme = oldSomme + nawsomme;
        setSomme(newSomme); // Update the state
        await AsyncStorage.setItem(`PAYMENT_AMOUNT_${userId}`, JSON.stringify(newSomme)); // Update AsyncStorage
      } catch (error) {
        console.log('Error updating AsyncStorage:', error);
      }
    }

    updateAsyncStorage();
  }, [nawsomme]);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const chartData = {
    Day: {
      labels: ["0:00", "6:00", "12:00", "18:00", "24:00"],
      datasets: [
        {
          data: [1500, 2000, 1800, 2200, 2500],
          color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
          strokeWidth: 2,
        }
      ],
      legend: ["Balance"],
    },
    Week: {
      labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      datasets: [
        {
          data: [15000, 16000, 17000, 18000, 12000, 22000, 20000],
          color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
          strokeWidth: 2,
        }
      ],
      legend: ["Balance"],
    },
    Month: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          data: [50000, 60000, 70000, 80000],
          color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
          strokeWidth: 2,
        }
      ],
      legend: ["Balance"],
    },
    Year: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          data: [200000, 210000, 220000, 230000, 240000, 250000, 260000, 270000, 280000, 290000, 300000, 310000],
          color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
          strokeWidth: 2,
        }
      ],
      legend: ["Balance"],
    }
  };

 


  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={require('../../images/pla.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Surface style={styles.header}>
            <View style={{ marginLeft: 20 }}>
              <Feather
                name='arrow-left'
                size={25}
                style={{ color: '#15273F' }}
                onPress={navigation.goBack}
              />
            </View>
            <Text style={styles.headerText}>Account</Text>
            <View style={{ marginRight: 20 }}>
              <Pressable>
                <Feather
                  name='share-2'
                  size={25}
                  style={{ color: '#15273F' }}
                />
              </Pressable>
            </View>
          </Surface>

          <View style={styles.profileInfo}>
            <View style={styles.imageContainer}>
              <Image source={require("../../images/aaa.png")} style={styles.profileImageStyle} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.accountTitle}>Mohamad Salah</Text>
              <Text style={styles.userInfo}>mohamadsalah02@gmail.com</Text>
              <Text style={styles.userInfo}>+ 216 28153955</Text>
            </View>
          </View>

          <View style={styles.line}></View>

          <Action title={'Listings'} icon={'edit'} onPress={() => navigation.navigate("apartement")} />
          <Action title={'Contact'} icon={'edit-location'} onPress={() => navigation.navigate("Contact")} />
          <Action title={'Notifications'} icon={'notifications'} onPress={() => navigation.navigate("Notifications")} />
          <Action title={'Edit Profile'} icon={'edit'} onPress={() => navigation.navigate("EditProfile")} />
          <Action title={'My House Requests'} icon={'insert-invitation'} onPress={() => navigation.navigate("requeststatus")} />
          <Action title={'My Lands Requests'} icon={'insert-invitation'} onPress={() => navigation.navigate("requeststatuslands")} />

          {/* Statistics display component */}
          {/* {statistics && <StatisticsDisplay stats={statistics} />} */}
          <Action title={'Add House'} icon={'home'} onPress={() => navigation.navigate("AddHouse")} />
          <Action title={'Add Land'} icon={'landscape'} onPress={() => navigation.navigate("AddLand")} />
          <Action title={'Logout'} icon={'logout'} onPress={() => navigation.navigate("profile")} />

        </ScrollView>
      </View>
      <View contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Statement</Text>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Day' ? styles.activeTab : {}]}
              onPress={() => handleTabPress('Day')}
            >
              <Text style={[styles.tabText, activeTab === 'Day' ? styles.activeTabText : {}]}>Day</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Week' ? styles.activeTab : {}]}
              onPress={() => handleTabPress('Week')}
            >
              <Text style={[styles.tabText, activeTab === 'Week' ? styles.activeTabText : {}]}>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Month' ? styles.activeTab : {}]}
              onPress={() => handleTabPress('Month')}
            >
              <Text style={[styles.tabText, activeTab === 'Month' ? styles.activeTabText : {}]}>Month</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Year' ? styles.activeTab : {}]}
              onPress={() => handleTabPress('Year')}
            >
              <Text style={[styles.tabText, activeTab === 'Year' ? styles.activeTabText : {}]}>Year</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.chartSection}>
          <View style={styles.dateRange}>
            <Text>12 Sep, 2023 - 18 Sep, 2023</Text>
            <Text>USD</Text>
          </View>
          <LineChart
            data={chartData[activeTab]}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>


      </View>
    </ScrollView>
  );
};

// StyleSheet definitions
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },
  overlay: {
    position: 'absolute',
    top: '35%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    height: 50,
    elevation: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#15273F',
  },
  profileInfo: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageStyle: {
    height: 115,
    width: 115,
    borderRadius: 60,
  },
  textContainer: {
    marginLeft: 20,
  },
  accountTitle: {
    fontFamily: "sans-serif-condensed",
    fontSize: 20,
    fontWeight: '600',
    color: "#15273F",
  },
  userInfo: {
    fontFamily: 'sans-serif-medium',
    fontSize: 17,
    color: 'gray',
    marginTop: 5,
  },
  action: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#15273F',
    justifyContent: "center",
    alignItems: 'center',
  },
  actionTitle: {
    marginLeft: 19,
    fontSize: 21,
    color: "#15273F",
  },
  line: {
    height: 3,
    backgroundColor: 'lightgray',
    marginVertical: 25,
  },
  statsContainer: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    marginTop: 20,
  },
  statsHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  container: {
    padding: 20,
    backgroundColor: '#F8FAFB',
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    padding: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 15,
  },
  activeTab: {
    backgroundColor: '#dba617',
  },
  tabText: {
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: 'white',
  },
  chartSection: {
    marginBottom: 20,
  },
  dateRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
  },
  summarySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryBox: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  balanceBox: {
    backgroundColor: '#417DBA',
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  summaryLabel: {
    fontSize: 14,
    color: 'white',
  },
  transactionSection: {
    marginBottom: 20,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  exportButtons: {
    flexDirection: 'row',
  },
  exportButton: {
    marginLeft: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  initialsCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: 'white',
    fontWeight: 'bold',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 10,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionTime: {
    color: '#999',
    marginBottom: 19
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserProfile;


