<!-- <script setup>
import { useSupabaseClient } from '@nuxtjs/supabase'

definePageMeta({
  layout: 'custom',
})

const supabase = useSupabaseClient()

const login = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    });

    if (error) {
      console.error(error.message)
      // Handle error if needed
    }
  } catch (error) {
    console.error('Failed to sign in with Google:', error.message)
    // Handle error if needed
  }
}
</script>

<template>
  <div class="mt-10">
    <h1 class="text-5xl font-bold mb-7">Log in</h1>
    <button @click="login" class="bg-red-400 rounded text-white font-bold p-3">Login with Google</button>
  </div>
</template> -->

<script setup>
// import { useSupabaseClient } from '@nuxtjs/supabase'
//const supabase = createClient('https://mwcbqthxbdmniwnwtroz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Y2JxdGh4YmRtbml3bnd0cm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwMzcyNTEsImV4cCI6MjAyNDYxMzI1MX0.OIk1KOpFg_YUg8Ns32eRmFuYSjLHeWBPcxp58AexKpY')

definePageMeta({
  layout: "custom",
});

const supabase = useSupabaseClient();
const login = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="mt-10">
    <h1 class="text-5xl font-bold mb-7">Log in</h1>
    <button
      @click="login()"
      class="bg-red-400 rounded text-white font-bold p-3"
    >
      Login with Google
    </button>
  </div>
</template>
