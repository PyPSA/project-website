<script lang="ts">
  let className: string = '';
  export { className as class };
  export let path: string;
  export let size: string = '24';
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width={size}
  height={size}
  class={className}
>
  <path d={path} fill="currentColor" />
</svg>
