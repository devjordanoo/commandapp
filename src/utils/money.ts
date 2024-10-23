export class MoneyConverter {
    public static convertToDecimal(value: string): number {
        let inputValue = value.toString();
        inputValue = inputValue.replace(/\D/g, "");
        inputValue = (+inputValue / 100).toFixed(2);
        return +inputValue;
    }

    public static convertToString(value: number): string {
        let inputValue = value.toFixed(2);
        const lastIndex = inputValue.lastIndexOf(".");

        if(lastIndex === -1) {
            inputValue = "R$ " + inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            inputValue = inputValue.replace(".", ",");
            return inputValue
        }

        inputValue = "R$ " + inputValue.slice(0, lastIndex) + "," + inputValue.slice(lastIndex + 1); 
        inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return inputValue;
    }
}