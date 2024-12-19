// Modal Component

const initializedModals = new WeakSet();

export function toggleModal(event) {
  const modalID = event.currentTarget.getAttribute("data-dui-target");
  const modal = document.querySelector(modalID);

  if (modal) {
    const isHidden = modal.classList.contains("pointer-events-none");
    modal.classList.toggle("opacity-0", !isHidden);

    if (isHidden) {
      modal.classList.remove("pointer-events-none");
    } else {
      setTimeout(() => modal.classList.add("pointer-events-none"), 300);
    }

    modal.classList.toggle("opacity-100", isHidden);
    const modalContent = modal.querySelector(isHidden ? ".scale-95" : ".scale-100");
    modalContent.classList.toggle("scale-95", !isHidden);
    modalContent.classList.toggle("scale-100", isHidden);
    modal.setAttribute("aria-hidden", !isHidden);

    // Add or remove event listener for clicks outside modal content
    if (isHidden) {
      modal.addEventListener("click", closeOnOutsideClick);
    } else {
      modal.removeEventListener("click", closeOnOutsideClick);
    }
  }
}

export function closeModal(event) {
  const modal = event.currentTarget.closest(".fixed");

  if (modal) {
    modal.classList.add("opacity-0");
    modal.classList.remove("opacity-100");
    const modalContent = modal.querySelector(".scale-100");
    modalContent.classList.add("scale-95");
    modalContent.classList.remove("scale-100");

    setTimeout(() => {
      modal.classList.add("pointer-events-none");
      modal.setAttribute("aria-hidden", "true");
    }, 300);

    modal.removeEventListener("click", closeOnOutsideClick);
  }
}

function closeOnOutsideClick(event) {
  const modalContent = event.currentTarget.querySelector(".scale-100, .scale-95");

  if (!modalContent.contains(event.target)) {
    closeModal({ currentTarget: event.currentTarget });
  }
}

export function initModal() {
  document.querySelectorAll("[data-dui-toggle='modal']").forEach((trigger) => {
    if (!initializedModals.has(trigger)) {
      trigger.addEventListener("click", toggleModal);
      initializedModals.add(trigger);
    }
  });

  document.querySelectorAll("[data-dui-dismiss='modal']").forEach((button) => {
    if (!initializedModals.has(button)) {
      button.addEventListener("click", closeModal);
      initializedModals.add(button);
    }
  });
}

// Auto-initialize Modals in the Browser Environment
if (typeof window !== "undefined" && typeof document !== "undefined") {
  initModal();
}