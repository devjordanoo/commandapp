import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { CreateUser } from "./_components/CreateUser";
import { CreateCompany } from "./_components/CreateCompany";

export default function Page() {
    return (
        <div className="min-h-screen bg-gray-100 flex gap-5 items-start justify-start py-12 px-4 sm:px-6 lg:px-8">
            <CreateUser />
            <CreateCompany />
        </div>
    )
}