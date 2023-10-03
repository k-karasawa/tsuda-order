export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customer: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      customer_department: {
        Row: {
          created_at: string
          customer_id: number | null
          department: string | null
          id: number
          sort: number | null
        }
        Insert: {
          created_at?: string
          customer_id?: number | null
          department?: string | null
          id?: number
          sort?: number | null
        }
        Update: {
          created_at?: string
          customer_id?: number | null
          department?: string | null
          id?: number
          sort?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_department_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "customer"
            referencedColumns: ["id"]
          }
        ]
      }
      order_list: {
        Row: {
          accept_date: string | null
          amount: string | null
          comment: string | null
          created_at: string
          customer: number | null
          customer_department: number | null
          customer_group: string | null
          customer_location: string | null
          customer_management_code: string | null
          customer_person: string | null
          desired_delivery_date: string | null
          estimate_code: string | null
          estimate_date: string | null
          id: number
          item_code: string | null
          item_name: string | null
          item_receive_date: string | null
          item_return_date: string | null
          lot: string | null
          order_code: string | null
          order_date: string | null
          order_form_code: string | null
          progress: number | null
          quantity: number | null
          receive_document_date: string | null
          request: string | null
          send_document_date: string | null
          shipment_date: string | null
          soft: string | null
        }
        Insert: {
          accept_date?: string | null
          amount?: string | null
          comment?: string | null
          created_at?: string
          customer?: number | null
          customer_department?: number | null
          customer_group?: string | null
          customer_location?: string | null
          customer_management_code?: string | null
          customer_person?: string | null
          desired_delivery_date?: string | null
          estimate_code?: string | null
          estimate_date?: string | null
          id?: number
          item_code?: string | null
          item_name?: string | null
          item_receive_date?: string | null
          item_return_date?: string | null
          lot?: string | null
          order_code?: string | null
          order_date?: string | null
          order_form_code?: string | null
          progress?: number | null
          quantity?: number | null
          receive_document_date?: string | null
          request?: string | null
          send_document_date?: string | null
          shipment_date?: string | null
          soft?: string | null
        }
        Update: {
          accept_date?: string | null
          amount?: string | null
          comment?: string | null
          created_at?: string
          customer?: number | null
          customer_department?: number | null
          customer_group?: string | null
          customer_location?: string | null
          customer_management_code?: string | null
          customer_person?: string | null
          desired_delivery_date?: string | null
          estimate_code?: string | null
          estimate_date?: string | null
          id?: number
          item_code?: string | null
          item_name?: string | null
          item_receive_date?: string | null
          item_return_date?: string | null
          lot?: string | null
          order_code?: string | null
          order_date?: string | null
          order_form_code?: string | null
          progress?: number | null
          quantity?: number | null
          receive_document_date?: string | null
          request?: string | null
          send_document_date?: string | null
          shipment_date?: string | null
          soft?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_list_customer_department_fkey"
            columns: ["customer_department"]
            referencedRelation: "customer_department"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_customer_fkey"
            columns: ["customer"]
            referencedRelation: "customer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_progress_fkey"
            columns: ["progress"]
            referencedRelation: "progress"
            referencedColumns: ["id"]
          }
        ]
      }
      order_list_duplicate: {
        Row: {
          accept_date: string | null
          amount: string | null
          comment: string | null
          created_at: string
          customer: number | null
          customer_department: number | null
          customer_group: string | null
          customer_location: string | null
          customer_management_code: string | null
          customer_person: string | null
          desired_delivery_date: string | null
          estimate_code: string | null
          estimate_date: string | null
          id: number
          item_code: string | null
          item_name: string | null
          item_receive_date: string | null
          item_return_date: string | null
          lot: string | null
          order_code: string | null
          order_date: string | null
          order_form_code: string | null
          progress: number | null
          quantity: number | null
          receive_document_date: string | null
          request: string | null
          send_document_date: string | null
          shipment_date: string | null
          soft: string | null
        }
        Insert: {
          accept_date?: string | null
          amount?: string | null
          comment?: string | null
          created_at?: string
          customer?: number | null
          customer_department?: number | null
          customer_group?: string | null
          customer_location?: string | null
          customer_management_code?: string | null
          customer_person?: string | null
          desired_delivery_date?: string | null
          estimate_code?: string | null
          estimate_date?: string | null
          id?: number
          item_code?: string | null
          item_name?: string | null
          item_receive_date?: string | null
          item_return_date?: string | null
          lot?: string | null
          order_code?: string | null
          order_date?: string | null
          order_form_code?: string | null
          progress?: number | null
          quantity?: number | null
          receive_document_date?: string | null
          request?: string | null
          send_document_date?: string | null
          shipment_date?: string | null
          soft?: string | null
        }
        Update: {
          accept_date?: string | null
          amount?: string | null
          comment?: string | null
          created_at?: string
          customer?: number | null
          customer_department?: number | null
          customer_group?: string | null
          customer_location?: string | null
          customer_management_code?: string | null
          customer_person?: string | null
          desired_delivery_date?: string | null
          estimate_code?: string | null
          estimate_date?: string | null
          id?: number
          item_code?: string | null
          item_name?: string | null
          item_receive_date?: string | null
          item_return_date?: string | null
          lot?: string | null
          order_code?: string | null
          order_date?: string | null
          order_form_code?: string | null
          progress?: number | null
          quantity?: number | null
          receive_document_date?: string | null
          request?: string | null
          send_document_date?: string | null
          shipment_date?: string | null
          soft?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_list_duplicate_customer_department_fkey"
            columns: ["customer_department"]
            referencedRelation: "customer_department"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_duplicate_customer_fkey"
            columns: ["customer"]
            referencedRelation: "customer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_duplicate_progress_fkey"
            columns: ["progress"]
            referencedRelation: "progress"
            referencedColumns: ["id"]
          }
        ]
      }
      progress: {
        Row: {
          created_at: string
          id: number
          progress: string
          sort: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          progress: string
          sort?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          progress?: string
          sort?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
