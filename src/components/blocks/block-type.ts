export interface BlockProps<V> {
  value: V;
  onChange: (newValue: V) => void | Promise<void>;
}
