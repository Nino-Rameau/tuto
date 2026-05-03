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

function uploadAdapter(loader) {
    return {
        upload: () => new Promise((resolve, reject) => {
            loader.file.then((file) => {
                const body = new FormData();
                body.append("upload", file);
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

const Ckeditor = ({ onChange, value }) => {
    return (
        <div className="prose-editor-container">
            <style jsx global>
                {`
                .ck-editor__editable_inline,
                .ck-source-editing-area textarea { min-height: 500px !important; max-height: 800px !important; color: white !important; }

                .ck.ck-editor__main > .ck-editor__editable { background: #000716 !important; }
                
                .ck-content ul { list-style-type: disc !important; margin-left: 1.5rem !important; }
                .ck-content ol { list-style-type: decimal !important; margin-left: 1.5rem !important; }

                .ck.ck-toolbar.ck-toolbar_grouping > .ck-toolbar__items {flex-wrap: wrap !important; }

                @media (max-width: 720px) {
                    .prose-editor-container {
                        max-width: 90vh !important; 
                    }
                    
                    .ck.ck-toolbar > .ck-toolbar__items {
                        justify-content: center;
                    }
                }
                
                .ck-content .bg-blue-50 { background-color: #eff6ff !important; border-left: 4px solid #3b82f6 !important; padding: 1.5rem !important; color: #1d4ed8 !important; margin: 1.5rem 0 !important; }
                .ck-content .bg-orange-50 { background-color: #fff7ed !important; border-left: 4px solid #f97316 !important; padding: 1.5rem !important; color: #c2410c !important; margin: 1.5rem 0 !important; }
                .ck-content .bg-green-50 { background-color: #f0fdf4 !important; border-left: 4px solid #22c55e !important; padding: 1.5rem !important; color: #15803d !important; margin: 1.5rem 0 !important; }
                `}
            </style>

            <CKEditor
                editor={ClassicEditor}
                data={value || ""}
                onReady={(editor) => { // oblige l'utilisation de uploadAdapter et non le plugin de base non adapté (url base64)
                    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => uploadAdapter(loader);
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
                            { name: 'Astuce', element: 'p', classes: ['bg-blue-50'] },
                            { name: 'Important', element: 'p', classes: ['bg-orange-50'] },
                            { name: 'Information', element: 'p', classes: ['bg-green-50'] }
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