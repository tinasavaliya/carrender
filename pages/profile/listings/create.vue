<script setup>
definePageMeta({
  layout: "custom",
});

const { makes } = useCars();
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const info = useState("adInfo", () => {
  return {
    make: "",
    model: "",
    year: "",
    miles: "",
    price: "",
    city: "",
    numberofseats: "",
    features: "",
    description: "",
    image: null,
  };
});

const errorMessage = ref("");

const onChangeInput = (data, name) => {
  info.value[name] = data;
};

const inputs = [
  {
    id: 1,
    title: "Model *",
    name: "model",
    placeholder: "200",
  },
  {
    id: 2,
    title: "Year *",
    name: "year", // Corrected from "Year" to "year"
    placeholder: "2019",
  },
  {
    id: 3,
    title: "Price *", // Corrected from "price *" to "Price *"
    name: "price",
    placeholder: "10000",
  },
  {
    id: 4,
    title: "Miles *",
    name: "miles",
    placeholder: "10000",
  },
  {
    id: 5,
    title: "City *",
    name: "city",
    placeholder: "Austin",
  },
  {
    id: 6,
    title: "Number of Seats *",
    name: "numberofseats",
    placeholder: "5",
  },
  {
    id: 7,
    title: "Features *",
    name: "features",
    placeholder: "Leather Interior, No Accidents",
  },
];

const isButtonDisabled = computed(() => {
  for (let key in info.value) {
    if (!info.value[key]) return true;
  }
  return false;
});

const handleSubmits = async () => {
  const fileName = Math.floor(Math.random() * 100000000000000000000 );
  const {data, error} = await supabase.storage.from("image").upload("public/" + fileName, info.value.image);

  if(error){
    return (errorMessage.value ="cannot upload image");
  }

  const body = {
    ...info.value,
    city: info.value.city.toLowerCase(),
    features: info.value.features.split(","),
    numberofseats: parseInt(info.value.numberofseats),
    miles: parseInt(info.value.miles),
    price: parseInt(info.value.price),
    year: parseInt(info.value.year),
    name: `${info.value.make} ${info.value.model}`,
    listerId: user.value.id,
    image: data.path,
  };
  delete body.seats;
  try {
    const response = await $fetch(`/api/car/listings`, {
      method: "post",
      body,
    });
    navigateTo("/profile/listings");
  } catch (error) {
    errorMessage.value = error.statusMessage;
    await supabase.storage.from("image").remove(data.path)
  }
};
</script>


<template>
  <div>
    <div class="mt-24">
      <h1 class="text-6xl">Create a New Listing</h1>
    </div>
    <div class="shadow rounded p-3 mt-5 flex flex-wrap justify-between">
      <CarAdSelect
        title="Make *"
        :options="makes"
        name="make"
        @change-input="onChangeInput"
      />
      <CarAdInput
        v-for="input in inputs"
        :key="input.id"
        :title="input.title"
        :name="input.name"
        :placeholder="input.placeholder"
        @change-input="onChangeInput"
      />
      <CarAdTextarea
        title="Description *"
        name="description"
        placeholder=""
        @change-input="onChangeInput"
      />
      <CarAdImage @change-input="onChangeInput" />
      <div class="my-2">
        <button
          :disabled="false"
          @click="handleSubmits"
          class="bg-blue-400 text-white rounded py-2 px-4"
        >
          submit
        </button>
        <p v-if="errorMessage" class="text-yellow mt-3">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>
