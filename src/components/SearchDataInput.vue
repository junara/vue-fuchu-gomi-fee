<script setup lang="ts">
import { useTextareaAutosize } from '@vueuse/core';
import { ref } from 'vue';
import Papa from 'papaparse';
import type { ParseResult } from 'papaparse';
import type { GomiFeeRow } from '@/types/GomiFeeRow';
import type { GomiFee } from '@/types/GomiFee';

const emits = defineEmits<{
  (event: 'change', value: GomiFee[]): void;
}>();

const gomiFees = ref<GomiFee[]>([]);
const inputValue = ref<string>(
  '品目,料金,ふりがな\n' + '布,200,ぬの\n' + '机,800,つくえ\n' + '鉄,不可,てつ',
);
const { textarea: textareaRef } = useTextareaAutosize({
  input: inputValue,
});
const onSubmit = () => {
  Papa.parse(inputValue.value, {
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
      emits('change', gomiFees.value);
    },
  });
};
</script>

<template>
  <div style="display: flex; flex-direction: row; row-gap: 1em">
    <div>
      <textarea ref="textareaRef" v-model="inputValue" />
    </div>
    <div>
      <button type="button" :disabled="!inputValue" @click="onSubmit">読み込む</button>
    </div>
  </div>
</template>
