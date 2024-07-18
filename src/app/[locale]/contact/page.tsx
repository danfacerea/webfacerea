import { ContactForm } from "./_components/ContactForm"
import { useCurrentLocale, useScopedI18n } from "@/locales/client"

const ContactPage = () => (
	<div className="flex flex-col items-center md:mt-20">
		<ContactForm />
	</div>
)

export default ContactPage
