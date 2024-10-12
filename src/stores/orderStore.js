import { defineStore } from 'pinia';

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    selectedItems: [],
  }),
  getters: {
    totalPrice(state) {
      return state.selectedItems.reduce((acc, item) => acc + item.price, 0);
    },
  },
  actions: {
    addItem(item) {
      this.selectedItems.push(item);
    },
    removeItem(itemId) {
      this.selectedItems = this.selectedItems.filter((item) => item.id !== itemId);
    },
    clearOrder() {
      this.selectedItems = [];
    },
  },
});
