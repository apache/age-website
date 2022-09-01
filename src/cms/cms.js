import CMS from 'netlify-cms-app';
import uploadcare from 'netlify-cms-media-library-uploadcare';
import cloudinary from 'netlify-cms-media-library-cloudinary';

import BlogPostPreview from './preview-templates/BlogPostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import OverViewPagePreview from './preview-templates/OverViewPagePreview'
import DocsPagePreview from './preview-templates/DocsPagePreview'

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('index', IndexPagePreview);
CMS.registerPreviewTemplate('overview', OverViewPagePreview);
CMS.registerPreviewTemplate('download', DocsPagePreview);
CMS.registerPreviewTemplate('release', DocsPagePreview);
CMS.registerPreviewTemplate('blog', BlogPostPreview);
