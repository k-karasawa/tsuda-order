export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
            isOneToOne: false
            referencedRelation: "customer"
            referencedColumns: ["id"]
          },
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
            isOneToOne: false
            referencedRelation: "order_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_return_return_orderlist_id_fkey"
            columns: ["return_orderlist_id"]
            isOneToOne: false
            referencedRelation: "order_list_extended"
            referencedColumns: ["id"]
          },
        ]
      }
      notice: {
        Row: {
          created_at: string
          function: boolean
          id: number
          message: string | null
          type: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          function?: boolean
          id?: number
          message?: string | null
          type: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          function?: boolean
          id?: number
          message?: string | null
          type?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_notice_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      order_list: {
        Row: {
          accept_date: string | null
          amount: number | null
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
          remark: string | null
          request: number
          send_document_date: string | null
          shipment_date: string | null
          soft: string | null
          status_updated_at: string | null
        }
        Insert: {
          accept_date?: string | null
          amount?: number | null
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
          remark?: string | null
          request: number
          send_document_date?: string | null
          shipment_date?: string | null
          soft?: string | null
          status_updated_at?: string | null
        }
        Update: {
          accept_date?: string | null
          amount?: number | null
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
          remark?: string | null
          request?: number
          send_document_date?: string | null
          shipment_date?: string | null
          soft?: string | null
          status_updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_list_customer_department_fkey"
            columns: ["customer_department"]
            isOneToOne: false
            referencedRelation: "customer_department"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_customer_fkey"
            columns: ["customer"]
            isOneToOne: false
            referencedRelation: "customer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_farm_fkey"
            columns: ["farm"]
            isOneToOne: false
            referencedRelation: "farm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_priority_fkey"
            columns: ["priority"]
            isOneToOne: false
            referencedRelation: "priority"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_progress_fkey"
            columns: ["progress"]
            isOneToOne: false
            referencedRelation: "progress"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_request_fkey"
            columns: ["request"]
            isOneToOne: false
            referencedRelation: "request"
            referencedColumns: ["id"]
          },
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
      rls_test: {
        Row: {
          created_at: string
          farm: number | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          farm?: number | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          farm?: number | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: number
          name: string | null
          organization: string | null
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          name?: string | null
          organization?: string | null
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          name?: string | null
          organization?: string | null
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      order_list_extended: {
        Row: {
          accept_date: string | null
          amount: number | null
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
          remark: string | null
          request: number | null
          request_name: string | null
          send_document_date: string | null
          shipment_date: string | null
          soft: string | null
          status_updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_list_customer_department_fkey"
            columns: ["customer_department"]
            isOneToOne: false
            referencedRelation: "customer_department"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_customer_fkey"
            columns: ["customer"]
            isOneToOne: false
            referencedRelation: "customer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_farm_fkey"
            columns: ["farm"]
            isOneToOne: false
            referencedRelation: "farm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_priority_fkey"
            columns: ["priority"]
            isOneToOne: false
            referencedRelation: "priority"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_progress_fkey"
            columns: ["progress"]
            isOneToOne: false
            referencedRelation: "progress"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_list_request_fkey"
            columns: ["request"]
            isOneToOne: false
            referencedRelation: "request"
            referencedColumns: ["id"]
          },
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
