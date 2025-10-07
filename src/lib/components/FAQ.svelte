<script lang="ts">
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "$lib/components/ui/accordion";
  import { DOCS_BASE_URL } from '$lib/config';

  interface FAQProps {
    question: string;
    answer: string;
    value: string;
  }

  const FAQList: FAQProps[] = [
    {
      question: "What is the difference between PyPSA and PyPSA-X?",
      answer: '<a href="https://github.com/PyPSA/pypsa" target="_blank" rel="noreferrer" class="hover:underline" style="color: #2993B5;">PyPSA</a> is a framework for optimising and simulating modern power and energy systems. It is a toolbox that does not hold any data. Specific model implementations such as <a href="https://github.com/pypsa-meets-earth/pypsa-earth" target="_blank" rel="noreferrer" class="hover:underline" style="color: #2993B5;">PyPSA-Earth</a>, <a href="https://github.com/PyPSA/pypsa-eur" target="_blank" rel="noreferrer" class="hover:underline" style="color: #2993B5;">PyPSA-Eur</a> and <a href="https://github.com/PyPSA/pypsa-usa" target="_blank" rel="noreferrer" class="hover:underline" style="color: #2993B5;">PyPSA-USA</a> integrate datasets, processing and workflow management.',
      value: "item-1",
    },
    {
      question: "Is using PyPSA for free?",
      answer: 'PyPSA is licensed under the <a href="https://opensource.org/license/mit" target="_blank" rel="noreferrer" class="hover:underline" style="color: #2993B5;">MIT open-source licence</a>, which makes it fully open-source and free for both commercial and academic use. Similar licences are used for other listed projects.',
      value: "item-2",
    },
    {
      question: "Do I need to buy a commercial solver?",
      answer: 'No, you can use open-source solvers such as <a href="https://highs.dev/" target="_blank" rel="noreferrer" class="hover:underline" style="color: #2993B5;">HiGHS</a>. But it helps for very large problems with high spatial and temporal resolution, cross-sectoral scope, and multiple investment periods. <a href="https://www.gurobi.com/solutions/gurobi-optimizer/" target="_blank" rel="noreferrer" class="hover:underline" style="color: #2993B5;">Gurobi</a> and <a href="https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-optimizer" target="_blank" rel="noreferrer" class="hover:underline" style="color: #2993B5;">CPLEX</a> are recommended for better performance or allow finding any solutions at all.',
      value: "item-3",
    },
    {
      question: "Can I get support for using PyPSA?",
      answer: 'PyPSA has an active community of users and developers on Discord and elsewhere who can help you with questions and issues. Also, various consultancies offer paid support, such as <a href="https://www.openenergytransition.org" target="_blank" rel="noreferrer" class="hover:underline" style="color: #2993B5;">OET</a>, <a href="https://www.d-fine.com/en/" target="_blank" rel="noreferrer" class="hover:underline" style="color: #2993B5;">d-fine</a>, <a href="https://energynautics.com/en/" target="_blank" rel="noreferrer" class="hover:underline" style="color: #2993B5;">Energynautics</a>, and <a href="https://www.climact.com/" target="_blank" rel="noreferrer" class="hover:underline" style="color: #2993B5;">CLIMACT</a>.',
      value: "item-4",
    },
  ];
</script>

<section id="faq" class="container md:w-[700px] py-24 sm:py-32">
  <div class="text-center mb-8">
    <h2 class="text-lg text-center mb-2 tracking-wider" style="color: #2993B5;">FAQ</h2>
    <h2 class="text-3xl md:text-4xl text-center font-bold">
      Frequently Asked Questions
    </h2>
  </div>

  <Accordion type="single" class="w-full">
    {#each FAQList as { question, answer, value }}
      <AccordionItem {value}>
        <AccordionTrigger class="text-left">
          {question}
        </AccordionTrigger>
        <AccordionContent>
          {@html answer}
        </AccordionContent>
      </AccordionItem>
    {/each}
  </Accordion>

  <h3 class="font-medium mt-4">
    Still have questions? Check out the full
    <a href="{DOCS_BASE_URL}/user-guide/faq" target="_blank" rel="noreferrer" class="hover:underline" style="color: #2993B5;">
      FAQ
    </a>
  </h3>
</section>