<template>
    <div>
        <h2>Your Order</h2>
        <div v-if="selectedItems.length">
            <ul>
                <li v-for="item in selectedItems" :key="item.id">
                    {{ item.title }} - ${{ item.price }}
                </li>
            </ul>
            <p>Total Price: ${{ totalPrice }}</p>
            <button @click="modifyOrder">Modify Order</button>
            <button @click="confirmOrder">Confirm Order</button>
        </div>
        <div v-else>
            <p>No items selected.</p>
            <button @click="modifyOrder">Back to Announcement</button>
        </div>
    </div>
</template>

<script setup>
import { useOrderStore } from '@/stores/orderStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

// Setup the store and router
const orderStore = useOrderStore();
const router = useRouter();

// Computed properties
const selectedItems = computed(() => orderStore.selectedItems);
const totalPrice = computed(() => orderStore.totalPrice);

// Methods
const modifyOrder = () => {
    router.push({ name: 'home' });
};

const confirmOrder = () => {
    alert('Order confirmed!');
    orderStore.clearOrder();
    router.push({ name: 'home' });
};
</script>