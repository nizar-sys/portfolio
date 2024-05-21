import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const baseApiUrl = window.location.origin; // use ur localhost if u running on your pc

createApp({
  data() {
    return {
      appName: "Muhamad Nizar",
      greeting: {
        title: "Muhamad Nizar",
        subtitle: "Muhamad Nizar is a web development agency.",
        btnText: "Who we are?",
        btnUrl: "#about",
        image: "./assets/img/hero-img.png",
        typerText: [
          "Web Development",
          "Web Design",
          "Product Management",
          "Marketing",
          "Graphic Design",
        ],
      },
      about: {
        title: "Who We Are",
        description:
          "Expedita voluptas omnis cupiditate totam eveniet nobis sint iste. Dolores est repellat corrupti reprehenderit.",
        image: "./assets/img/about.jpg",
        resume: "./assets/img/resume.pdf",
      },
      services: {
        title: "Services",
        description: "Veritatis et dolores facere numquam et praesentium",
        services_item: [],
      },
      portofolio: {
        title: "Portfolio",
        description: "Veritatis et dolores facere numquam et praesentium",
        categories: [],
        items: [],
      },
      footer: {
        info: "Muhamad Nizar is a web development agency.",
        copyRight: "Muhamad Nizar",
        poweredBy: "Muhamad Nizar",
        icons: [],
        useFulLinks: [
          { name: "Home", url: "#hero" },
          { name: "About", url: "#about" },
          { name: "Services", url: "#services" },
          { name: "Portfolio", url: "#portfolio" },
          { name: "Team", url: "#team" },
          { name: "Contact", url: "#contact" },
        ],
        helpLinks: [{ name: "Web Design", url: "#" }],
        contact: {
          address: "A108 Adam Street, New York, NY 535022",
          phone: "+1 5589 55488 55",
          email: "codeplatery@gmail.com",
        },
      },
    };
  },
  async mounted() {
    this.fetchPage();
  },
  methods: {
    async fetchPage() {
      try {
        const response = await fetch(`${baseApiUrl}/data.json`);
        const { status, data } = await response.json();
        if (status === "success") {
          const {
            hero,
            typer_title,
            footer_info,
            footer_icons,
            footer_useful_links,
            footer_help_links,
            footer_contact,
            services,
            about_me,
            portofolio,
          } = data;
          this.updateGreeting(hero, typer_title);
          this.updateFooterInfo(
            footer_info,
            footer_icons,
            footer_useful_links,
            footer_help_links,
            footer_contact
          );
          this.updateAboutMe(about_me);
          this.updateService(services);
          this.updatePortofolio(portofolio);
        } else {
          throw new Error("Failed to fetch page");
        }
      } catch (error) {
        console.error("Error fetching page:", error);
      }
      this.typerInitialize();
      document.addEventListener("click", this.handleMobileNavToggle);
    },
    updateGreeting(
      { title, sub_title, btn_text, btn_url, image_path },
      typerTitles
    ) {
      this.greeting = {
        title,
        subtitle: sub_title,
        btnText: btn_text,
        btnUrl: btn_url,
        image: image_path,
        typerText: typerTitles.map((item) => item.title),
      };
      document.title = title;
    },
    updateFooterInfo(
      { info, copy_right, powered_by },
      footerIcons,
      useFulLinks,
      helpLinks,
      footerContact
    ) {
      this.footer = {
        info,
        copyRight: copy_right,
        poweredBy: powered_by,
        icons: footerIcons,
        useFulLinks,
        helpLinks,
        contact: footerContact,
      };
    },
    updateAboutMe({ title, description, image_url, resume_url }) {
      this.about = {
        title,
        description,
        image: image_url,
        resume: resume_url,
      };
    },
    updateService({ title, description, services_item }) {
      this.services = {
        title,
        description,
        services_item,
      };
    },
    updatePortofolio({ title, description, categories, items }) {
      this.portofolio = {
        title,
        description,
        categories,
        items,
      };
    },
    handleMobileNavToggle(event) {
      if (event.target.matches(".mobile-nav-toggle")) {
        const navbar = document.querySelector("#navbar");
        const mobileNavToggle = event.target;

        navbar.classList.toggle("navbar-mobile");
        mobileNavToggle.classList.toggle("bi-list");
        mobileNavToggle.classList.toggle("bi-x");
      }
    },
    typerInitialize() {
      Typify("#typer-title", {
        text: this.greeting.typerText,
        delay: 100,
        loop: true,
        cursor: true,
        stringDelay: 1000,
      });
    },
    async sendEmail() {
      const name = document.querySelector('input[name="name"]').value;
      const email = document.querySelector('input[name="email"]').value;

      const form = document.querySelector(".php-email-form");
      const formData = new FormData(form);
      formData.append("service_id", "service_jy8q2ho");
      formData.append("template_id", "template_qznvagw");
      formData.append("user_id", "user_gPcKdq1hcnEmPMYX5oekb");
      formData.append(
        "template_params",
        JSON.stringify({
          name,
          email,
          message: form.querySelector('[name="message"]').value,
        })
      );

      try {
        const response = await fetch(
          "https://api.emailjs.com/api/v1.0/email/send-form",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to send email.");
        }

        document.querySelector(".sent-message").style.display = "block";
      } catch (error) {
        console.error("Error:", error);
        document.querySelector(".error-message").style.display = "block";
      }
    },
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleMobileNavToggle);
  },
}).mount("#app");
