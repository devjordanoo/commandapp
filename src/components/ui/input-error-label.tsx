import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface InputErrorLabelProps {
    hasError: boolean;
    message?: string;
}

const InputErrorLabel = ({ hasError, message }: InputErrorLabelProps) => {
    if(hasError)
        return (
            <Alert variant="destructive" className="mt-3">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertDescription>
                    {message}
                </AlertDescription>
            </Alert>
        )
}

export { InputErrorLabel }