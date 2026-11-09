const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector(".form-status");
const projectModal = document.querySelector("#project-modal");
const modalCloseButton = document.querySelector(".modal-close");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const modalRole = document.querySelector("#modal-role");
const modalTechnologies = document.querySelector("#modal-technologies");
const modalOutcome = document.querySelector("#modal-outcome");

const projectDetails = {
  lumio: {
    name: "Lumio",
    description: "여러 금융 정보를 한곳에서 확인하고 이해하기 쉽게 정리하는 자산관리 서비스입니다.",
    role: "제품 기획 협업, UX 리서치, 사용자 흐름 및 UI 디자인",
    technologies: ["Figma", "FigJam", "Prototyping"],
    outcome: "핵심 자산 정보를 확인하는 단계를 줄이고, 사용성 테스트에서 주요 화면 이해도를 높였습니다."
  },
  mori: {
    name: "Mori",
    description: "느긋한 일상의 순간을 소개하고 취향에 맞는 상품을 발견하도록 돕는 라이프스타일 브랜드입니다.",
    role: "브랜드 방향성 정리, 비주얼 아이덴티티, 온라인 스토어 디자인",
    technologies: ["Figma", "Illustrator", "Shopify"],
    outcome: "브랜드의 시각 언어를 온라인 경험 전반에 일관되게 적용하고 상품 탐색 흐름을 개선했습니다."
  },
  ondo: {
    name: "Ondo Studio",
    description: "동네의 공간과 창작자를 소개해 사용자와 지역의 새로운 만남을 만드는 큐레이션 서비스입니다.",
    role: "서비스 컨셉 정의, 정보 구조 설계, 반응형 웹 UI 디자인",
    technologies: ["Figma", "FigJam", "HTML", "CSS"],
    outcome: "장소와 주제별 탐색을 단순화하고, 지역 콘텐츠를 발견하는 경로를 명확하게 구성했습니다."
  }
};

let lastFocusedElement = null;

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// 선택한 프로젝트의 상세 내용을 모달에 표시하고 포커스를 이동합니다.
function openProjectModal(projectId, trigger) {
  const project = projectDetails[projectId];
  if (!project) {
    throw new Error(`프로젝트 상세 데이터를 찾을 수 없습니다: ${projectId}`);
  }

  lastFocusedElement = trigger;
  modalTitle.textContent = project.name;
  modalDescription.textContent = project.description;
  modalRole.textContent = project.role;
  modalOutcome.textContent = project.outcome;
  modalTechnologies.replaceChildren(...project.technologies.map((technology) => {
    const item = document.createElement("li");
    item.textContent = technology;
    return item;
  }));
  trigger.setAttribute("aria-expanded", "true");
  projectModal.hidden = false;
  document.body.classList.add("modal-open");
  modalCloseButton.focus();
}

// 모달을 닫고 열기 전 프로젝트 카드로 키보드 포커스를 돌려보냅니다.
function closeProjectModal() {
  if (projectModal.hidden) {
    return;
  }

  projectModal.hidden = true;
  document.body.classList.remove("modal-open");
  lastFocusedElement?.setAttribute("aria-expanded", "false");
  lastFocusedElement?.focus();
  lastFocusedElement = null;
}

// 모달이 열린 동안 Tab 포커스가 모달 밖으로 나가지 않도록 합니다.
function keepFocusInsideModal(event) {
  const focusableElements = projectModal.querySelectorAll("button:not([disabled])");
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

document.querySelectorAll(".project-card-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openProjectModal(trigger.dataset.project, trigger);
  });
});

modalCloseButton.addEventListener("click", closeProjectModal);

projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) {
    closeProjectModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (projectModal.hidden) {
    return;
  }

  if (event.key === "Escape") {
    closeProjectModal();
  } else if (event.key === "Tab") {
    keepFocusInsideModal(event);
  }
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = new FormData(contactForm).get("name");
  formStatus.textContent = `${name}님, 메시지를 확인했습니다. 곧 답변드릴게요!`;
  contactForm.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();
