package crescent.toolbox.live

import com.intellij.codeInsight.template.TemplateActionContext
import com.intellij.codeInsight.template.TemplateContextType
//TemplateContextType参数为上下文的标识符
internal class ReactContext : TemplateContextType("React") {
//    判断是否在指定的上下文环境
    override fun isInContext(templateActionContext: TemplateActionContext): Boolean {
        return templateActionContext.file.name.endsWith(".tsx")
    }
}