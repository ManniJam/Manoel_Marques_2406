import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { CreditCard, Plus, Trash2, Check } from 'lucide-react';
import { mockPaymentMethods } from '../../mock';
import RiderLayout from '../../components/layouts/RiderLayout';
import { useToast } from '../../hooks/use-toast';

const PaymentMethods = () => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [defaultMethod, setDefaultMethod] = useState(
    mockPaymentMethods.find(p => p.isDefault)?.id
  );

  const handleSetDefault = (methodId) => {
    setDefaultMethod(methodId);
    setPaymentMethods(methods =>
      methods.map(m => ({ ...m, isDefault: m.id === methodId }))
    );
    toast({
      title: "Default payment updated",
      description: "Your default payment method has been changed",
    });
  };

  const handleRemove = (methodId) => {
    if (paymentMethods.length === 1) {
      toast({
        title: "Cannot remove",
        description: "You must have at least one payment method",
        variant: "destructive"
      });
      return;
    }

    setPaymentMethods(methods => methods.filter(m => m.id !== methodId));
    toast({
      title: "Payment method removed",
      description: "The payment method has been deleted",
    });
  };

  const handleAddCard = () => {
    toast({
      title: "Add payment method",
      description: "Payment integration coming soon",
    });
  };

  return (
    <RiderLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Payment methods</h1>
          <Button onClick={handleAddCard} className="bg-black hover:bg-gray-800">
            <Plus className="w-5 h-5 mr-2" />
            Add method
          </Button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map(method => (
            <Card key={method.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    {method.type === 'card' ? (
                      <div>
                        <div className="font-semibold text-lg">
                          {method.brand} •••• {method.last4}
                        </div>
                        <div className="text-sm text-gray-600">Credit card</div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-semibold text-lg">Cash</div>
                        <div className="text-sm text-gray-600">Pay with cash</div>
                      </div>
                    )}
                    {method.isDefault && (
                      <div className="flex items-center mt-2">
                        <Check className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-sm text-green-600 font-medium">Default</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!method.isDefault && (
                    <Button
                      onClick={() => handleSetDefault(method.id)}
                      variant="outline"
                      size="sm"
                    >
                      Set as default
                    </Button>
                  )}
                  {method.type !== 'cash' && (
                    <Button
                      onClick={() => handleRemove(method.id)}
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="p-6 mt-8 bg-gray-50">
          <h3 className="font-semibold mb-2">Secure payments</h3>
          <p className="text-sm text-gray-600">
            Your payment information is encrypted and secure. We never share your financial details with drivers.
          </p>
        </Card>
      </div>
    </RiderLayout>
  );
};

export default PaymentMethods;