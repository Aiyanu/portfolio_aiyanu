import Underline from "./Underline";

// EducationSection.jsx (React + Tailwind)
export default function EducationSection() {
    return (
        <section id="education" className="py-12 space-y-4">
            <div>
                <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Education</h2>
                <Underline className="w-16 -mt-4" />
            </div>

            <div className="border rounded-2xl p-6 shadow-sm
                      
                      border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                            Bachelor of Science (B.Sc.) in Computer Science
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            First Class Division — GPA:{" "}
                            <span className="font-medium text-gray-800 dark:text-gray-100">4.63 / 5.00</span>
                        </p>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
                            Afe Babalola University (ABUAD) — Ado-Ekiti, Ekiti State, Nigeria
                        </p>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-400 md:text-right">
                        <span className="inline-block md:block">Expected</span>
                        <span className="block font-medium mt-1 text-gray-800 dark:text-gray-100">October 2024</span>
                    </div>
                </div>

                <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
                    <li>
                        <strong>Thesis:</strong> Development of a Nigerian Vehicle License Plate Recognition System Using Deep Learning
                    </li>
                    <li>
                        <strong>Relevant courses:</strong> Data Structures; Computer Graphics; Artificial Intelligence; Software Engineering; Electronic Commerce
                    </li>
                </ul>
            </div>
        </section>
    )
}
