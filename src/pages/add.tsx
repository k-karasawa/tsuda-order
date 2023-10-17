// components/AddOrder.tsx
import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';

const AddOrder: React.FC = () => {
  const [orderCode, setOrderCode] = useState('');
  const [progress, setProgress] = useState(0);
  const [customer, setCustomer] = useState(0);

  const handleAddOrder = async () => {
    try {
      const newOrder = {
        order_code: orderCode,
        progress: progress,
        customer: customer,
      };
      const { data, error } = await supabase
        .from('order_list')
        .insert([newOrder]);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  return (
    <div>
      <div>
        <label>Order Code:</label>
        <input value={orderCode} onChange={e => setOrderCode(e.target.value)} />
      </div>
      <div>
        <label>Progress:</label>
        <input type="number" value={progress} onChange={e => setProgress(Number(e.target.value))} />
      </div>
      <div>
        <label>Customer:</label>
        <input type="number" value={customer} onChange={e => setCustomer(Number(e.target.value))} />
      </div>
      <button onClick={handleAddOrder}>Add Order</button>
    </div>
  );
};

export default AddOrder;
