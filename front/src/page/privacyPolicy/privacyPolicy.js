export default function PrivacyPolicy() {
  const faqsList = [
    {
      q: "",
      a: "In accordance with the provisions of Articles 6-III and 19 of Law No. 2004-575 of June 21, 2004 for the Confidence in the digital economy, known as L.C.E.N., it is brought to the attention of users and visitors, hereinafter the “User”, of the site https://production-bay.vercel.app/, hereinafter the “Site”, the these legal notices Connection and navigation on the Site by the User implies full and unreserved acceptance.of these legal notices.These are accessible on the Site in the “Legal notices” section.",
    },
    {
      q: "ARTICLE 1 - THE PUBLISHER",
      a: "The editing and management of the publication of the Site is ensured by CARPENTIER Andrew, domiciled 5 rue marconi, 62880 vendin-le-vieil, whose telephone number is 0636477245, and email address andr3wcarpentier@gmail.com.below the “Publisher”.",
    },
    {
      q: "ARTICLE 2 - THE HOST",
      a: "The Site is hosted by Vercel Inc., whose head office is located at 440 N Barranca Ave#4133, Covina, CA 91723, with telephone number: 0000000000 + privacy@vercel.com",
    },
    {
      q: "ARTICLE 3 - ACCESS TO THE SITE",
      a: "The Site is accessible anywhere, 7 days a week, 24 hours a day except in cases of force majeure or interruption.scheduled or not and which may arise from a need for maintenance.In the event of modification, interruption or suspension of the Site, the Publisher cannot be held responsible.",
    },
    {
      q: "ARTICLE 4 - DATA COLLECTION",
      a: "The Site ensures that the User collects and processes personal information in compliance with privacy in accordance with law n°78-17 of January 6, 1978 relating to computers, files and freedoms.Under the Data Protection Act, dated January 6, 1978, the User has a right access, rectification, deletion and opposition of personal data. The user exercises this right:<br/>- by email to the email address andr3wcarpentier@gmail.com <br/>- via a contact form<br/>- via their personal space<br/>Any use, reproduction, distribution, marketing, modification of all or part of the Site, without authorization from the Publisher is prohibited and may result in legal action and prosecution. as provided for in particular by the Intellectual Property Code and the Civil Code.",
    },
  ];

  return (
    <section className="py-14">
      <div className="hidden items-center justify-between sm:flex">
        <a
          href="/"
          className="hover:text-indigo-600 flex items-center gap-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
              clipRule="evenodd"
            />
          </svg>
          Previous
        </a>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 gap-12 md:flex md:px-8">
        <div className="flex-1">
          <div className="max-w-lg">
            <h3 className="font-semibold text-indigo-600">
              Effective 02/10/23
            </h3>
            <p className="mt-3 text-gray-800 text-3xl font-extrabold sm:text-4xl">
              Privacy Policy
            </p>
          </div>
        </div>
        <div className="flex-1 mt-12 md:mt-0">
          <ul className="space-y-4 divide-y">
            {faqsList.map((item, idx) => (
              <li className="py-5" key={idx}>
                <summary className="flex items-center justify-between font-semibold text-gray-700">
                  {item.q}
                </summary>
                <p
                  dangerouslySetInnerHTML={{ __html: item.a }}
                  className="mt-3 text-gray-600 leading-relaxed"
                ></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
