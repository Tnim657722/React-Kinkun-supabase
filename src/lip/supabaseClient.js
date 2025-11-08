import { creatClient } from '@supabase/supabase-js';   


const supabaseUrl = import.meta.process.env.REACT_SUPABASE_URL;
const supabaseAnonKey =import.meta.process.env.REACT_SUPABASE_API;


export const supabase = creatClient(supabaseUrl, supabaseAnonKey);