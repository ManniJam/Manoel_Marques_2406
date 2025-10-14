import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { User, Mail, Phone, Star, Award, MapPin, Settings, Bell, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import RiderLayout from '../../components/layouts/RiderLayout';
import { useToast } from '../../hooks/use-toast';

const RiderProfile = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your changes have been saved",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    });
    setIsEditing(false);
  };

  return (
    <RiderLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your profile</h1>

        {/* Profile Header */}
        <Card className="p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.picture} />
              <AvatarFallback className="text-2xl">{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
              <div className="flex items-center justify-center md:justify-start space-x-4 text-gray-600">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-semibold">{user?.rating}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  <span>{user?.totalRides} trips</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Personal information</h3>
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
              >
                Edit
              </Button>
            ) : (
              <div className="space-x-2">
                <Button onClick={handleCancel} variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-black hover:bg-gray-800">
                  Save
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="flex items-center mb-2">
                <User className="w-4 h-4 mr-2" />
                Full name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="text-lg"
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center mb-2">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                className="text-lg"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center mb-2">
                <Phone className="w-4 h-4 mr-2" />
                Phone number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                className="text-lg"
              />
            </div>
          </div>
        </Card>

        {/* Settings */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Settings</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center">
              <Bell className="w-5 h-5 mr-3 text-gray-600" />
              <div className="flex-1">
                <div className="font-medium">Notifications</div>
                <div className="text-sm text-gray-600">Manage notification preferences</div>
              </div>
            </button>
            <button className="w-full text-left p-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center">
              <Shield className="w-5 h-5 mr-3 text-gray-600" />
              <div className="flex-1">
                <div className="font-medium">Privacy & Safety</div>
                <div className="text-sm text-gray-600">Control your privacy settings</div>
              </div>
            </button>
            <button className="w-full text-left p-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center">
              <Settings className="w-5 h-5 mr-3 text-gray-600" />
              <div className="flex-1">
                <div className="font-medium">Preferences</div>
                <div className="text-sm text-gray-600">App settings and preferences</div>
              </div>
            </button>
          </div>
        </Card>
      </div>
    </RiderLayout>
  );
};

export default RiderProfile;