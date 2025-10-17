// Mock data for Hermes and Eshu ride-sharing platform

export const mockUsers = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    picture: 'https://i.pravatar.cc/150?img=12',
    type: 'rider',
    rating: 4.8,
    totalRides: 156
  },
  {
    id: 'driver1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1234567891',
    picture: 'https://i.pravatar.cc/150?img=5',
    type: 'driver',
    rating: 4.9,
    totalRides: 892,
    vehicle: {
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      color: 'Silver',
      plate: 'ABC 1234'
    },
    earnings: 15240.50
  }
];

export const mockVehicleTypes = [
  {
    id: 'joyze-standard',
    name: 'Joyze Standard',
    description: 'Affordable, everyday rides',
    capacity: 4,
    pricePerKm: 1.5,
    baseFare: 3.0,
    icon: 'Car',
    estimatedTime: '2 min'
  },
  {
    id: 'joyze-comfort',
    name: 'Joyze Comfort',
    description: 'Newer cars with extra legroom',
    capacity: 4,
    pricePerKm: 2.0,
    baseFare: 5.0,
    icon: 'Car',
    estimatedTime: '3 min'
  },
  {
    id: 'joyze-xl',
    name: 'Joyze XL',
    description: 'Affordable rides for groups up to 6',
    capacity: 6,
    pricePerKm: 2.5,
    baseFare: 6.0,
    icon: 'Truck',
    estimatedTime: '5 min'
  },
  {
    id: 'joyze-premium',
    name: 'Joyze Premium',
    description: 'High-end cars with top-rated drivers',
    capacity: 4,
    pricePerKm: 3.5,
    baseFare: 8.0,
    icon: 'Crown',
    estimatedTime: '4 min'
  }
];

export const mockLocations = [
  { id: 'loc1', name: 'Downtown Plaza', address: '123 Main St', lat: 40.7128, lng: -74.0060 },
  { id: 'loc2', name: 'Central Park', address: '456 Park Ave', lat: 40.7829, lng: -73.9654 },
  { id: 'loc3', name: 'Airport Terminal', address: '789 Airport Rd', lat: 40.6413, lng: -73.7781 },
  { id: 'loc4', name: 'Shopping Mall', address: '321 Commerce St', lat: 40.7489, lng: -73.9680 },
  { id: 'loc5', name: 'Business District', address: '654 Corporate Dr', lat: 40.7589, lng: -73.9851 }
];

export const mockRides = [
  {
    id: 'ride1',
    riderId: 'user1',
    driverId: 'driver1',
    vehicleType: 'hermes-x',
    pickup: mockLocations[0],
    dropoff: mockLocations[1],
    status: 'completed',
    fare: 18.50,
    distance: 5.2,
    duration: 15,
    requestedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000).toISOString(),
    rating: 5,
    review: 'Great ride!'
  },
  {
    id: 'ride2',
    riderId: 'user1',
    driverId: 'driver1',
    vehicleType: 'hermes-comfort',
    pickup: mockLocations[2],
    dropoff: mockLocations[0],
    status: 'completed',
    fare: 45.20,
    distance: 12.3,
    duration: 25,
    requestedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 25 * 60 * 1000).toISOString(),
    rating: 4
  },
  {
    id: 'ride3',
    riderId: 'user1',
    vehicleType: 'hermes-x',
    pickup: mockLocations[3],
    dropoff: mockLocations[4],
    status: 'active',
    fare: 22.30,
    distance: 7.8,
    duration: 18,
    requestedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    driverId: 'driver1',
    estimatedArrival: new Date(Date.now() + 3 * 60 * 1000).toISOString()
  }
];

export const mockPaymentMethods = [
  {
    id: 'card1',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    isDefault: true
  },
  {
    id: 'card2',
    type: 'card',
    last4: '5555',
    brand: 'Mastercard',
    isDefault: false
  },
  {
    id: 'cash',
    type: 'cash',
    name: 'Cash',
    isDefault: false
  }
];

export const mockDriverRides = [
  {
    id: 'dride1',
    riderId: 'user1',
    riderName: 'John Doe',
    riderRating: 4.8,
    pickup: mockLocations[0],
    dropoff: mockLocations[1],
    fare: 18.50,
    distance: 5.2,
    status: 'requested'
  },
  {
    id: 'dride2',
    riderId: 'user1',
    riderName: 'John Doe',
    riderRating: 4.8,
    pickup: mockLocations[3],
    dropoff: mockLocations[2],
    fare: 32.00,
    distance: 9.5,
    status: 'requested'
  }
];

// Helper function to calculate fare
export const calculateFare = (vehicleTypeId, distance) => {
  const vehicleType = mockVehicleTypes.find(v => v.id === vehicleTypeId);
  if (!vehicleType) return 0;
  return (vehicleType.baseFare + (distance * vehicleType.pricePerKm)).toFixed(2);
};

// Helper to get current user from localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
};