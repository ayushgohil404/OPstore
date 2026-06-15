import { productsApi } from './src/lib/api';

async function test() {
  try {
    const res = await productsApi.getFeatured();
    console.log("getFeatured res:", res);
  } catch (e) {
    console.error("getFeatured error:", e);
  }
}
test();
