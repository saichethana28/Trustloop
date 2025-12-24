
import React from 'react';
import { OrderStatus, ProductType } from '../types';
import { ICONS } from '../constants';

interface OrderTrackerProps {
  status: OrderStatus;
  type: ProductType;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ status, type }) => {
  const physicalSteps = [
    { label: 'Order Placed', value: OrderStatus.PLACED },
    { label: 'Packed', value: OrderStatus.PACKED },
    { label: 'Shipped', value: OrderStatus.SHIPPED },
    { label: 'Out for Delivery', value: OrderStatus.OUT_FOR_DELIVERY },
    { label: 'Delivered', value: OrderStatus.DELIVERED },
  ];

  const digitalSteps = [
    { label: 'Purchase Completed', value: OrderStatus.PLACED },
    { label: 'Access Provided', value: OrderStatus.COMPLETED },
  ];

  const steps = type === ProductType.PHYSICAL ? physicalSteps : digitalSteps;
  const currentIndex = steps.findIndex(s => s.value === status);

  return (
    <div className="w-full py-8">
      <div className="relative flex items-center justify-between">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-sky-500 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.value} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-4 transition-colors duration-300 ${
                  isCompleted ? 'bg-sky-500 border-sky-100 text-white' : 'bg-white border-gray-200 text-gray-400'
                }`}
              >
                {isCompleted ? <ICONS.Check /> : <span>{index + 1}</span>}
              </div>
              <div className={`absolute top-10 whitespace-nowrap text-xs font-medium ${isCurrent ? 'text-sky-600' : 'text-gray-500'}`}>
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
