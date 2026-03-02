const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    console.log('Testing Supabase connection...');
    // Check common table names
    const { data, error } = await supabase.from('reservations').select('*').limit(1);
    if (error) {
        if (error.code === '42P01') {
            console.log('Table reservations does not exist. Trying reservas...');
            const { data: data2, error: error2 } = await supabase.from('reservas').select('*').limit(1);
            if (error2) console.log('Error querying reservas:', error2.message);
            else console.log('Success connecting to reservas. Items:', data2);
        } else {
            console.log('Error:', error.message);
        }
    } else {
        console.log('Success connecting to reservations. Data:', data);
    }
}
testConnection();
