<script setup>
  const user = useSupabaseUser()
  const logout = async () =>{
    const {error} = await  upabase.auth.signOut();
  try
  {
      await $fetch("/api/_supabase/session",{
        method:"POST",
        body:
        {
          event:"SIGNED_OUT",
          session:null
          }
      })
  }
  catch(error)
    {
     return  console.log(error);
    }
    user.value = null;
    navigateTo('/')
    if(error){
        console.log(error);
    }
  }
</script>
<template>
  <header
    class="
      sticky
      top-0
      z-50
      flex
      justify-between
      items-center
      space-x-1
      border-b
      bg-white
      p-4
      shadow-md
    "
  ><NuxtLink class="text-3xl font-mono" to="/">cartrader</NuxtLink>
    <div v-if="user" class="flex">
      <NuxtLink to="/profile/listings">profile</NuxtLink>
      <p to="/logout" class="cursor-pointer px-3" @click="logout">Logout</p>
    </div>
    <NuxtLink v-else to="/login">Login</NuxtLink>
  </header>
</template>
<!-- <NuxtLink class="text-3xl font-mono" to="/">cartrader</NuxtLink>
    <div v-if="user" class="flex">
      <NuxtLink to="/profile/listings">profile</NuxtLink>
      <p to="/logout" class="cursor-pointer" @click="logout">Logout</p>
    </div>
    <NuxtLink v-else to="/login">Login</NuxtLink> -->