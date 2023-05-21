<script setup lang="ts">
import { ref } from 'vue';
import SearchResultSearch from '@/components/SearchResultSearch.vue';
import SearchDataImport from '@/components/SearchDataImport.vue';
import type { GomiFee } from '@/types/GomiFee';
import SearchDataInput from '@/components/SearchDataInput.vue';
import csvUrl from '@/data/fuchu-gomi.csv';
import useGomiFeeCsv from '@/composables/useGomiFeeCsv';
const { importFromUrl } = useGomiFeeCsv();

const gomiFees = ref<GomiFee[]>([]);

const onChangeImport = (value: GomiFee[]) => {
  gomiFees.value = value;
};

const onReset = () => {
  gomiFees.value = [];
};

importFromUrl(csvUrl, (_gomiFees: GomiFee[]) => {
  gomiFees.value = _gomiFees;
});
</script>

<template>
  <div v-if="gomiFees.length === 0" style="display: flex; flex-direction: row; column-gap: 1em">
    <SearchDataImport @change="onChangeImport" />
    <div>or</div>
    <SearchDataInput @change="onChangeImport" />
  </div>
  <SearchResultSearch v-if="gomiFees.length > 0" :gomi-fees="gomiFees" @reset="onReset" />
</template>
