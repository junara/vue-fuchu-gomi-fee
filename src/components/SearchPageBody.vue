<script setup lang="ts">
import { ref } from 'vue';
import SearchResultSearch from '@/components/SearchResultSearch.vue';
import SearchDataImport from '@/components/SearchDataImport.vue';
import type { GomiFee } from '@/types/GomiFee';
import SearchDataInput from '@/components/SearchDataInput.vue';
import csvUrl from '@/data/fuchu-gomi.csv';
import Papa from 'papaparse';
import type { ParseResult } from 'papaparse';
import type { GomiFeeRow } from '@/types/GomiFeeRow';

const gomiFees = ref<GomiFee[]>([]);

const onChangeImport = (value: GomiFee[]) => {
  gomiFees.value = value;
};

const onReset = () => {
  gomiFees.value = [];
};

Papa.parse(csvUrl, {
  download: true,
  header: true,
  complete: (results: ParseResult<GomiFeeRow>) => {
    gomiFees.value = results.data.map((row) => {
      return {
        key: row['key'],
        name: row['品目'],
        furigana: row['ふりがな'],
        fee: row['料金'],
      };
    });
  },
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
