import { supabase } from '../../../utils/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

const lookupTablesAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { data: progressData, error: progressError } = await supabase.from('progress').select('*');
    const { data: priorityData, error: priorityError } = await supabase.from('priority').select('*');
    const { data: customerData, error: customerError } = await supabase.from('customer').select('*');
    const { data: customerDepartmentData, error: customerDepartmentError } = await supabase.from('customer_department').select('*');
    const { data: farmData, error: farmError } = await supabase.from('farm').select('*');
    const { data: requestData, error: requestError } = await supabase.from('request').select('*');

    if (progressError || priorityError || customerError || customerDepartmentError || farmError || requestError) {
      throw new Error('Database fetch error');
    }

    const lookupData = {
      progress: Object.fromEntries(progressData!.map(p => [p.progress, p.id])),
      priority: Object.fromEntries(priorityData!.map(p => [p.level, p.id])),
      customer: Object.fromEntries(customerData!.map(c => [c.name, c.id])),
      customer_department: Object.fromEntries(customerDepartmentData!.map(cd => [cd.department, cd.id])),
      farm: Object.fromEntries(farmData!.map(f => [f.name, f.id])),
      request: Object.fromEntries(requestData!.map(r => [r.name, r.id]))
    };

    res.status(200).json(lookupData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default lookupTablesAPI;

