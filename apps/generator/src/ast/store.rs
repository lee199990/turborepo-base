use oxc::allocator::{Allocator, Box};
use oxc::ast::ast::{
    BindingPatternKind, Expression, IdentifierName, IdentifierReference, ObjectExpression,
    ObjectProperty, ObjectPropertyKind, PropertyKey, PropertyKind, VariableDeclaration,
    VariableDeclarator,
};
use oxc::ast::visit::walk_mut::walk_variable_declaration_mut;
use oxc::ast::{AstBuilder, VisitMut};

pub struct AstStoreSlice<'a> {
    var_name: &'a str,
    key_values: (String, String),
    builder: AstBuilder<'a>,
}

impl<'a> AstStoreSlice<'a> {
    pub fn new(allocator: &'a Allocator, key: String, value: String) -> Self {
        AstStoreSlice {
            builder: AstBuilder::new(allocator),
            var_name: "slice",
            key_values: (key, value),
        }
    }

    fn insert(&self, obj: &mut Box<'a, ObjectExpression<'a>>) {
        let (k, v) = &self.key_values;
        let key = PropertyKey::Identifier(self.builder.alloc(IdentifierName::new(
            Default::default(),
            self.builder.new_atom(k),
        )));
        let value = Expression::Identifier(self.builder.alloc(IdentifierReference::new(
            Default::default(),
            self.builder.new_atom(v),
        )));
        let property = self.builder.alloc(ObjectProperty {
            span: Default::default(),
            kind: PropertyKind::Init,
            key,
            value,
            init: None,
            method: false,
            shorthand: false,
            computed: false,
        });
        obj.properties
            .push(ObjectPropertyKind::ObjectProperty(property));
    }
}

impl<'a> VisitMut<'a> for AstStoreSlice<'a> {
    // 匹配变量声明
    fn visit_variable_declaration(&mut self, decl: &mut VariableDeclaration<'a>) {
        for declaration in decl.declarations.iter() {
            // 循环文件内的所有变量找出名字带有【var_name】的变量，然后进入下一阶段
            // walk_variable_declaration_mut会进入到visit_variable_declarator函数
            if let BindingPatternKind::BindingIdentifier(id) = &declaration.id.kind {
                if id.name.contains(self.var_name) {
                    walk_variable_declaration_mut(self, decl);
                    return;
                }
            }
        }
    }

    fn visit_variable_declarator(&mut self, declarator: &mut VariableDeclarator<'a>) {
        if let Some(Expression::ObjectExpression(obj)) = &mut declarator.init {
            self.insert(obj)
        }
    }
}
