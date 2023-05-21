<script setup lang="ts">
import { useTextareaAutosize } from '@vueuse/core';
import { ref } from 'vue';
import type { GomiFee } from '@/types/GomiFee';
import useGomiFeeCsv from '@/composables/useGomiFeeCsv';

const { importFromString } = useGomiFeeCsv();
const emits = defineEmits<{
  (event: 'change', value: GomiFee[]): void;
}>();

const inputValue = ref<string>(
  '品目,料金,ふりがな\n' + '布,200,ぬの\n' + '机,800,つくえ\n' + '鉄,不可,てつ',
);
const { textarea: textareaRef } = useTextareaAutosize({
  input: inputValue,
});
const onSubmit = () => {
  importFromString(inputValue.value, (gomiFees: GomiFee[]) => {
    emits('change', gomiFees);
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
