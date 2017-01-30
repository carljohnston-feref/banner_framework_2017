# banner_framework_2017
Feref HTML5 Sass banner framework for compiling minified CSS and Javascript.

## Functions
There are multiple functions of this framework, as listed below.

1. Create a seperate, minified version of the `'dev'` folder ready for distribution.
2. Concatinate Javascript files.
3. Compress images to reduce file size.

## Foler Structure
### Development Folder
```
+-- dev/

|	+-- css/

|	|	+-- scss/
|	|	|	+-- _reset.scss
|	|	|	+-- _utils.scss
|	|	|	+-- style.scss

|	|	+-- style.css
|	|	+-- style.min.css

|	+-- img/

|	+-- index.html

|	+-- js/
|	|	+-- ignore/

|	|	+-- modules/
|	|	|	+-- 01_doubleclick.js
|	|	|	+-- 02_date_switch.js
|	|	|	+-- 03_animation.js
|	|	|	+-- 04_custom_metrics.js
|	|	|	+-- 05_remarketing.js
|	|	|	+-- 06_exits.js

|	|	+-- scripts.js
|	|	+-- scripts.min.js

|	+-- videos/
```

### Distribution Folder
```
+-- dist/

|	+-- css/
|	|	+-- style.min.css

|	+-- img/

|	+-- index.html

|	+-- js/
|	|	+-- scripts.min.js

|	+-- videos/
```

## Task Runner
The framework is setup to compile using Gulp and NPM.

### Order of Operations
1. Duplicate `'index.html'` to the `'dist'` folder.
2. Replace HTML code in `'dist/index.html'` to include the minified CSS and Javascript suffix (.min.css/js).
3. Compile Sass to `'dev/css/style.css'`.
4. Minify and copy `'dev/css/style.css'` to `'dist/css/style.min.css'`.
5. Concatinate all JS modules in `'dev/js/modules'` to `'dist/js/scripts.js'`.
6. Minify and copy `'dev/js/scripts.js'` to `'dist/js/scripts.min.js'`.
7. Compress and copy images in `'dev/img'` to `'dist/img'`.
8. Copy videos from `'dev/videos'` to `'dist/videos'`.

## Additional Information
### Javascript
- Javascript files in `'dev/js/modules'` are compiled in alphabetical order. Please keep this in mind when adding any additional script files.
- Any files contained within `'dev/js/ignore'` will not be compiled.