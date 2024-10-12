<template>
    <div>
        <h2>Announcement</h2>
        <div v-if="loading">Loading items...</div>
        <div v-else>
            <div v-for="item in items" :key="item.id" class="item">
                <input type="checkbox" :id="`item-${item.id}`" :value="item" @change="toggleSelection(item)"
                    :checked="isSelected(item)" />
                <label :for="`item-${item.id}`">
                    <img :src="item.image" alt="Product image" width="50" />
                    {{ item.title }} - ${{ item.price }}
                </label>
            </div>

            <div v-if="selectedItems.length">
                <h3>Selected Items</h3>
                <ul>
                    <li v-for="item in selectedItems" :key="item.id">
                        {{ item.title }} - ${{ item.price }}
                    </li>
                </ul>
                <p>Total Price: ${{ totalPrice }}</p>
                <button @click="proceedToOrder">Order</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useOrderStore } from '@/stores/orderStore';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// Setup the store and router
const orderStore = useOrderStore();
const router = useRouter();

// State
const items = ref([]);
const loading = ref(true);

// Computed properties
const selectedItems = computed(() => orderStore.selectedItems);
const totalPrice = computed(() => orderStore.totalPrice);

// Methods
const toggleSelection = (item) => {
    if (selectedItems.value.some((i) => i.id === item.id)) {
        orderStore.removeItem(item.id);
    } else {
        orderStore.addItem(item);
    }
};

const isSelected = (item) => {
    return selectedItems.value.some((i) => i.id === item.id);
};

const proceedToOrder = () => {
    router.push({ name: 'order' });
};

// Fetch items from API when component is mounted
onMounted(async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        // Assign the response data to items
        items.value = response.data.map((product) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
        }));
    } catch (error) {
        console.error('Error fetching items:', error);
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>
.item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
</style>