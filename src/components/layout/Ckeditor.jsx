'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { 
    ClassicEditor, Bold, Essentials, Italic, Paragraph, Undo, Heading, List, Link, 
    BlockQuote, Table, TableToolbar, MediaEmbed, Alignment, 
    GeneralHtmlSupport, Style, CodeBlock, SourceEditing,
    Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, ImageInsert, AutoImage,
    FontColor, FontBackgroundColor, FontSize, FontFamily, HorizontalLine,
    Underline, Strikethrough
} from 'ckeditor5';

import 'ckeditor5/translations/fr.js';
import 'ckeditor5/ckeditor5.css';

function creerUploadAdapter(loader, slug) {
    return {
        upload: () => new Promise((resolve, reject) => {
            loader.file.then((file) => {
                const body = new FormData();
                body.append("upload", file);
                if (slug) body.append("slug", slug);
                fetch("/api/upload", { method: "POST", body: body })
                .then(async (res) => {
                    const data = await res.json();
                    if (!res.ok || !data?.url) {
                        throw new Error(data?.error || "Erreur upload image");
                    }
                    return data;
                })
                .then((res) => resolve({ default: res.url }))
                .catch((err) => reject(err));
            });
        })
    };
}

const Ckeditor = ({ onChange, value, slug = '' }) => {
    return (
        <div className="prose-editor-container">
            <style jsx global>
                {`
                /* Style de l'éditeur / curseur */
                .ck-editor__editable_inline, .ck-source-editing-area textarea { 
                    min-height: 500px !important; 
                    max-height: 800px !important; 
                    color: white !important; 
                    caret-color: white !important; 
                }
                
                .ck-editor__editable_inline * { 
                    caret-color: white !important; 
                }

                /* fond de l'éditeur */
                .ck.ck-editor__main > .ck-editor__editable { 
                    background: #000716 !important; 
                }
                
                /* styles pour les titres dans l'éditeur */
                .ck-content h2 { 
                    font-size: 1.5rem !important; 
                    font-weight: 700 !important; 
                    font-family: var(--font-titre) !important; 
                }
                .ck-content h3 { 
                    font-size: 1.25rem !important; 
                    font-weight: 600 !important; 
                    font-family: var(--font-titre) !important; 
                }
                .ck-content h4 { 
                    font-size: 1.125rem !important; 
                    font-weight: 500 !important; 
                    font-family: var(--font-titre) !important; 
                }
                .ck-content h2 *, .ck-content h3 *, .ck-content h4 * { 
                    font-size: inherit !important; 
                    font-weight: inherit !important; 
                    font-family: inherit !important; 
                }

                .ck-content ul { 
                    list-style-type: disc !important; 
                    margin-left: 1.5rem !important; 
                }
                .ck-content ol { 
                    list-style-type: decimal !important; 
                    margin-left: 1.5rem !important; 
                }

                /* Styles pour la barre d'outils responsive */
                .ck.ck-toolbar.ck-toolbar_grouping > .ck-toolbar__items {
                    flex-wrap: wrap !important; 
                }

                /* Responsive du menu style */
                @media (max-width: 720px) {
                    .prose-editor-container {
                        max-width: 90vh !important; 
                    }
                    
                    .ck.ck-toolbar > .ck-toolbar__items {
                        justify-content: center;
                    }
                }
                
                /* styles pour les blocs d'astuces, important, info */
                .ck-content .bg-blue-50 { 
                    background-color: #eff6ff !important; 
                    border-left: 4px solid #3b82f6 !important; 
                    padding: 1.5rem !important; 
                    color: #000000 !important; 
                    margin: 1.5rem 0 !important; 
                }
                .ck-content .bg-orange-50 { 
                    background-color: #fff7ed !important; 
                    border-left: 4px solid #f97316 !important; 
                    padding: 1.5rem !important; 
                    color: #000000 !important; 
                    margin: 1.5rem 0 !important; 
                }
                .ck-content .bg-green-50 { 
                    background-color: #f0fdf4 !important; 
                    border-left: 4px solid #22c55e !important; 
                    padding: 1.5rem !important; 
                    color: #000000 !important; 
                    margin: 1.5rem 0 !important; 
                }

                /* styles pour les blocs de code */
                .ck-content pre { 
                    background-color: #0d1117 !important; 
                    border: 1px solid #30363d !important; 
                    border-radius: 6px !important; 
                    padding: 1rem 1.25rem !important; 
                    margin: 1.25rem 0 !important; 
                    overflow-x: auto !important; 
                }
                .ck-content pre code { 
                    font-family: 'Courier New', Courier, monospace !important; 
                    font-size: 0.875rem !important; 
                    color: #e6edf3 !important; 
                }
                .ck-content code:not(pre code) { 
                    font-family: 'Courier New', Courier, monospace !important; 
                    font-size: 0.875rem !important; 
                    background-color: #0d1117 !important; 
                    color: #e6edf3 !important; 
                    padding: 0.15rem 0.4rem !important;
                }
                `}
            </style>

            <CKEditor
                editor={ClassicEditor}
                data={value || ""}
                onReady={(editor) => { // oblige l'utilisation de uploadAdapter et non le plugin de base non adapté (url base64)
                    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => creerUploadAdapter(loader, slug);
                    const header = document.querySelector('header');
                    if (header && editor.ui.view.stickyPanel) {
                        editor.ui.view.stickyPanel.viewportTopOffset = header.offsetHeight;
                    }
                }}
                config={{
                    licenseKey: 'GPL', // pour utiliser la version gratuite open-source
                    language: 'fr',
                    plugins: [
                        Essentials, Undo, Heading, Bold, Italic, Paragraph, Link, List, 
                        BlockQuote, Table, TableToolbar, Alignment, GeneralHtmlSupport, 
                        Style, CodeBlock, SourceEditing, MediaEmbed, FontColor, 
                        FontBackgroundColor, FontSize, FontFamily, 
                        HorizontalLine, Underline, Strikethrough,
                        Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, ImageInsert, AutoImage
                    ],
                    toolbar: [
                        'undo', 'redo', '|', 'style', '|', 'heading', 'fontFamily', 'fontSize', '|',
                        'bold', 'italic', 'underline', 'strikethrough', 'fontColor', 'fontBackgroundColor', '|',
                        'alignment', '|', 'bulletedList', 'numberedList', 'link', '|',
                        'insertImage', 'mediaEmbed', 'insertTable', 'blockQuote', 'codeBlock', 'horizontalLine', '|',
                        'sourceEditing'
                    ],
                    heading: {
                        options: [
                            { model: 'paragraph', title: 'Paragraphe', class: 'ck-heading_paragraph' },
                            { model: 'heading2', view: 'h2', title: 'Titre 2' },
                            { model: 'heading3', view: 'h3', title: 'Titre 3' },
                            { model: 'heading4', view: 'h4', title: 'Titre 4' }
                        ]
                    },
                    style: {
                        definitions: [
                            { name: 'Astuce', element: 'p', classes: ['bg-blue-50 text-bleu-fonce border-l-4 border-blue-500 p-4 rounded m-2'] },
                            { name: 'Important', element: 'p', classes: ['bg-orange-50 text-bleu-fonce border-l-4 border-orange-500 p-4 rounded m-2'] },
                            { name: 'Information', element: 'p', classes: ['bg-green-50 text-bleu-fonce border-l-4 border-green-500 p-4 rounded m-2'] }
                        ]
                    },
                    fontSize: {
                        options: ['12px', 'default (16px)', '18px', '24px', '32px', '48px'],
                        supportAllValues: true
                    },
                    image: {
                        toolbar: [ 'imageStyle:block', 'imageStyle:side', '|', 'toggleImageCaption', 'imageTextAlternative' ]
                    },
                    mediaEmbed: {
                        previewsInData: true
                    },
                    htmlSupport: {
                        allow: [
                            {
                                name: /^(div|section|span)$/,
                                classes: true, styles: true
                            }
                        ]
                    }
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    if (onChange) onChange(data);
                }}
            />
        </div>
    );
};

export default Ckeditor;