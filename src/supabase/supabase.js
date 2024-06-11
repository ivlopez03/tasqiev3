
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fvnxewmwzdgaezjcaosm.supabase.co'
//const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2bnhld213emRnYWV6amNhb3NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyMzE0ODMsImV4cCI6MjAzMjgwNzQ4M30.oD2P7JZLrILtlNOb4dWc-e0IpToj1IyaOvMJTkkQ3F0"

export const supabase = createClient(supabaseUrl, supabaseKey)

