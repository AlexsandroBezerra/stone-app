export default function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-br', {
    currency: 'BRL',
    style: 'currency',
  }).format(value);
}
