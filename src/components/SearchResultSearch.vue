<script setup lang="ts">
import type { GomiFee } from '@/types/GomiFee';
import { ref } from 'vue';
import { useFuse } from '@vueuse/integrations/useFuse';
interface Props {
  gomiFees: GomiFee[];
}
const props = defineProps<Props>();

const emits = defineEmits<{
  (event: 'reset'): void;
}>();

const searchText = ref('');
const { results } = useFuse(searchText, props.gomiFees, {
  fuseOptions: {
    keys: ['name', 'furigana'],
  },
  matchAllWhenSearchEmpty: false,
});

const onInputSearchText = (e: any) => {
  searchText.value = e.target.value;
};

const onReset = () => {
  emits('reset');
};
</script>
<template>
  <div>
    <div>
      <button @click="onReset">データリセット</button>
    </div>
    <div>
      <input type="text" placeholder="検索" @input="onInputSearchText" />
    </div>
    <div style="display: flex; flex-direction: column; row-gap: 1em">
      <div
        v-for="result in results"
        :key="result.item.key"
        style="display: flex; column-gap: 1em; flex-wrap: wrap"
      >
        <label>{{ result.item.name }}</label>
        <div>
          {{ result.item.furigana }}
        </div>
        <div>
          {{ result.item.fee }}
        </div>
      </div>
    </div>
  </div>
</template>
