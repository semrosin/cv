# My CV web-site

**Hi! This is my CV. It's written with React, JS, and Tailwind CSS.**

![waveKitten](public/img/waveKitten.gif)

## Сборка PDF-резюме

Исходник резюме — `public/docs/CV.tex`, результат — `public/docs/CV.pdf`.
После редактирования `.tex` нужно заново запустить компилятор, чтобы обновить PDF.

Для сборки достаточно [Tectonic](https://tectonic-typesetting.github.io/en-US/install.html).

Откройте PowerShell в корне этого репозитория и выполните:

```powershell
& "C:\Tools\Tectonic\tectonic.exe" .\public\docs\CV.tex
if ($LASTEXITCODE -ne 0) { throw "Не удалось собрать резюме" }
Invoke-Item .\public\docs\CV.pdf
```

Если папка с `tectonic.exe` добавлена в `PATH`, команда короче:

```powershell
tectonic .\public\docs\CV.tex
```
