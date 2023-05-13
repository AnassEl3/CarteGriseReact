/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";


const ThemeSwitch = () => {
    
    useEffect(() => {
        const HSThemeAppearance = {
            init() {
                const defaultTheme = "default";
                const theme = localStorage.getItem("hs_theme") || defaultTheme;
        
                if (document.querySelector("html")!.classList.contains("dark")) return;
                this.setAppearance(theme);
            },
            _resetStylesOnLoad() {
                const $resetStyles = document.createElement("style");
                $resetStyles.innerText = `*{transition: unset !important;}`;
                $resetStyles.setAttribute("data-hs-appearance-onload-styles", "");
                document.head.appendChild($resetStyles);
                return $resetStyles;
            },
            setAppearance(theme: string, saveInStore = true, dispatchEvent = true) {
                const $resetStylesEl = this._resetStylesOnLoad();
        
                if (saveInStore) {
                    localStorage.setItem("hs_theme", theme);
                }
        
                if (theme === "auto") {
                    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
                        ? "dark"
                        : "default";
                }
        
                document.querySelector("html")!.classList.remove("dark");
                document.querySelector("html")!.classList.remove("default");
                document.querySelector("html")!.classList.remove("auto");
        
                document
                    .querySelector("html")!
                    .classList.add(this.getOriginalAppearance());
        
                setTimeout(() => {
                    $resetStylesEl.remove();
                });
        
                if (dispatchEvent) {
                    window.dispatchEvent(
                        new CustomEvent("on-hs-appearance-change", { detail: theme })
                    );
                }
            },
            getAppearance() {
                let theme = this.getOriginalAppearance();
                if (theme === "auto") {
                    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
                        ? "dark"
                        : "default";
                }
                return theme;
            },
            getOriginalAppearance() {
                const defaultTheme = "default";
                return localStorage.getItem("hs_theme") || defaultTheme;
            },
        };
        HSThemeAppearance.init();
    
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", () => {
                if (HSThemeAppearance.getOriginalAppearance() === "auto") {
                    HSThemeAppearance.setAppearance("auto", false);
                }
            });
    
        window.addEventListener("load", () => {
            const $clickableThemes = document.querySelectorAll(
                "[data-hs-theme-click-value]"
            );
            const $switchableThemes = document.querySelectorAll(
                "[data-hs-theme-switch]"
            );
    
            $clickableThemes.forEach(($item) => {
                $item.addEventListener("click", () =>
                    HSThemeAppearance.setAppearance(
                        $item.getAttribute("data-hs-theme-click-value")!,
                        true,
                        !!$item
                    )
                );
            });
    
            $switchableThemes.forEach(($item) => {
                $item.addEventListener("change", (e) => {
                    const element = e.target as HTMLInputElement;
                    HSThemeAppearance.setAppearance(
                        element.checked ? "dark" : "default"
                    );
                });
                const themeItem = $item as HTMLInputElement;
                themeItem.checked = HSThemeAppearance.getAppearance() === "dark";
            });
    
            window.addEventListener("on-hs-appearance-change", (e: any) => {
                $switchableThemes.forEach(($item) => {
                    const themeItem = $item as HTMLInputElement;
                    themeItem.checked = e.detail === "dark";
                });
            });
        });
    }, []);

    return (
        <>
            <div className="px-2 mx-1">
                <button
                    className="hs-dark-mode-active:hidden block hs-dark-mode group items-center text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500"
                    data-hs-theme-click-value="dark"
                >
                    <FontAwesomeIcon icon={faMoon} size="lg" />
                </button>
                <button
                    className="hs-dark-mode-active:block hidden hs-dark-mode group items-center text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500"
                    data-hs-theme-click-value="light"
                >
                    <FontAwesomeIcon icon={faSun} size="lg" />
                </button>
            </div>
        </>
    );
};

export default ThemeSwitch;
