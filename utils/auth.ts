import { GetServerSidePropsContext } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

export const auth = async (context: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(context)
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      initialSession: session,
    },
  }
}
