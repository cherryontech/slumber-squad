// Contact page (#contact), linked from the footer.
// A mailto: link opens the person's email app; the address is also shown
// as text so it can be copied if they don't have an email app set up.
//
// TODO: replace with the squad's real email address.
const CONTACT_EMAIL = "squad-email@example.com";

function ContactPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="w-full max-w-xl rounded-3xl bg-brand-soft px-6 py-10 text-center sm:px-12">
        <h1 className="text-3xl leading-tight sm:text-4xl">Contact us</h1>
        <p className="mt-4">
          Have a question, an idea for a guide, or feedback about the site? We'd
          love to hear from you.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-6 inline-block rounded-full bg-brand px-5 py-2 font-semibold text-white hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Email us<span className="sr-only"> at {CONTACT_EMAIL}</span>
        </a>
        <p className="mt-4 text-sm">
          Or copy our address:{" "}
          <span className="font-semibold break-all">{CONTACT_EMAIL}</span>
        </p>
      </div>
    </div>
  );
}

export default ContactPage;
