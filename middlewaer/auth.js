export default function ({ app, redirect }) {
  const user = app.$supabase.auth.user();
  if (!user) {
    return redirect("/login");
  }
  // const { auth } = useSupabase();

  // // Check if a user is authenticated
  // if (auth.user) {
  //   // User is authenticated
  //   console.log("User is signed in:", auth.user);
  //   // You can access user details like auth.user.id, auth.user.email, etc.
  // } else {
  //   // User is not authenticated
  //   console.log("User is not signed in.");
  // }
}
// export default defineNuxtRouteMiddleware{
//     const user = useSupabaseUser();
//     if(user.value){
//     return;
//   }
//   return navigateTo("/login");
// }
//global mddleware
// export default defineNuxtRouteMiddleware((to,from) =>{
//   console.log("i am tinaaaa!!");

//   if(to.path.includes("profile")){
//     const user = useSupabaseUser();
//     if(user.value){
//     return;
//   }
//   return navigateTo("/login");
// }
// });
