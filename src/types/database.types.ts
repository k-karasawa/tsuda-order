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
          sort: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          sort?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          sort?: number | null
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
      farm: {
        Row: {
          created_at: string
          id: number
          name: string
          prefix: string | null
          sort: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          prefix?: string | null
          sort?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          prefix?: string | null
          sort?: number | null
        }
        Relationships: []
      }
      item_return: {
        Row: {
          created_at: string
          id: number
          remark: string | null
          reshipment_date: string | null
          return_date: string
          return_orderlist_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          remark?: string | null
          reshipment_date?: string | null
          return_date: string
          return_orderlist_id: number
        }
        Update: {
          created_at?: string
          id?: number
          remark?: string | null
          reshipment_date?: string | null
          return_date?: string
          return_orderlist_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "item_return_return_orderlist_id_fkey"
            columns: ["return_orderlist_id"]
            referencedRelation: "order_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_return_return_orderlist_id_fkey"
            columns: ["return_orderlist_id"]
            referencedRelation: "order_list_extended"
            referencedColumns: ["id"]
          }
        ]
      }
      order_list: {
        Row: {
          accept_date: string | null
          amount: string | null
          attention: boolean
          comment: string | null
          created_at: string
          customer: number
          customer_department: number | null
          customer_group: string | null
          customer_location: string | null
          customer_management_code: string | null
          customer_person: string | null
          desired_delivery_date: string | null
          estimate_code: string | null
          estimate_date: string | null
          farm: number | null
          id: number
          item_code: string | null
          item_name: string | null
          item_receive_date: string | null
          item_return_date: string | null
          lot: string | null
          order_code: number
          order_date: string | null
          order_form_code: string | null
          prefix: string
          priority: number
          progress: number
          quantity: number | null
          receive_document_date: string | null
          request: number
          send_document_date: string | null
          shipment_date: string | null
          soft: string | null
        }
        Insert: {
          accept_date?: string | null
          amount?: string | null
          attention?: boolean
          comment?: string | null
          created_at?: string
          customer: number
          customer_department?: number | null
          customer_group?: string | null
          customer_location?: string | null
          customer_management_code?: string | null
          customer_person?: string | null
          desired_delivery_date?: string | null
          estimate_code?: string | null
          estimate_date?: string | null
          farm?: number | null
          id?: number
          item_code?: string | null
          item_name?: string | null
          item_receive_date?: string | null
          item_return_date?: string | null
          lot?: string | null
          order_code: number
          order_date?: string | null
          order_form_code?: string | null
          prefix: string
          priority?: number
          progress: number
          quantity?: number | null
          receive_document_date?: string | null
          request: number
          send_document_date?: string | null
          shipment_date?: string | null
          soft?: string | null
        }
        Update: {
          accept_date?: string | null
          amount?: string | null
          attention?: boolean
          comment?: string | null
          created_at?: string
          customer?: number
          customer_department?: number | null
          customer_group?: string | null
          customer_location?: string | null
          customer_management_code?: string | null
          customer_person?: string | null
          desired_delivery_date?: string | null
          estimate_code?: string | null
          estimate_date?: string | null
          farm?: number | null
          id?: number
          item_code?: string | null
          item_name?: string | null
          item_receive_date?: string | null
          item_return_date?: string | null
          lot?: string | null
          order_code?: number
          order_date?: string | null
          order_form_code?: string | null
          prefix?: string
          priority?: number
          progress?: number
          quantity?: number | null
          receive_document_date?: string | null
          request?: number
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
            foreignKeyName: "order_list_farm_fkey"
            columns: ["farm"]
            referencedRelation: "farm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_priority_fkey"
            columns: ["priority"]
            referencedRelation: "priority"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_progress_fkey"
            columns: ["progress"]
            referencedRelation: "progress"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_request_fkey"
            columns: ["request"]
            referencedRelation: "request"
            referencedColumns: ["id"]
          }
        ]
      }
      priority: {
        Row: {
          created_at: string
          id: number
          level: string
          sort: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          level?: string
          sort?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          level?: string
          sort?: number | null
        }
        Relationships: []
      }
      progress: {
        Row: {
          color: string | null
          created_at: string
          id: number
          progress: string
          sort: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: number
          progress: string
          sort?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: number
          progress?: string
          sort?: number | null
        }
        Relationships: []
      }
      request: {
        Row: {
          created_at: string
          id: number
          name: string
          sort: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          sort?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          sort?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      order_list_extended: {
        Row: {
          accept_date: string | null
          amount: string | null
          attention: boolean | null
          comment: string | null
          created_at: string | null
          customer: number | null
          customer_department: number | null
          customer_department_name: string | null
          customer_group: string | null
          customer_location: string | null
          customer_management_code: string | null
          customer_name: string | null
          customer_person: string | null
          desired_delivery_date: string | null
          estimate_code: string | null
          estimate_date: string | null
          farm: number | null
          farm_name: string | null
          id: number | null
          item_code: string | null
          item_name: string | null
          item_receive_date: string | null
          item_return_date: string | null
          lot: string | null
          order_code: number | null
          order_date: string | null
          order_form_code: string | null
          prefix: string | null
          priority: number | null
          priority_level: string | null
          progress: number | null
          progress_name: string | null
          quantity: number | null
          receive_document_date: string | null
          request: number | null
          request_name: string | null
          send_document_date: string | null
          shipment_date: string | null
          soft: string | null
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
            foreignKeyName: "order_list_farm_fkey"
            columns: ["farm"]
            referencedRelation: "farm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_priority_fkey"
            columns: ["priority"]
            referencedRelation: "priority"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_progress_fkey"
            columns: ["progress"]
            referencedRelation: "progress"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_request_fkey"
            columns: ["request"]
            referencedRelation: "request"
            referencedColumns: ["id"]
          }
        ]
      }
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
