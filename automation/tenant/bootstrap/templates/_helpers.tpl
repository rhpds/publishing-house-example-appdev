{{/*
Tenant namespace name.
*/}}
{{- define "tenant.namespace" -}}
{{ .Values.tenant.name }}-postcard
{{- end -}}

{{/*
Common labels applied to all tenant resources.
*/}}
{{- define "tenant.labels" -}}
app.kubernetes.io/part-of: ocp-appdev-quicklabs
app.kubernetes.io/managed-by: argocd
ocp-appdev-quicklabs/tenant: {{ .Values.tenant.name }}
ocp-appdev-quicklabs/guid: {{ .Values.deployer.guid }}
{{- end -}}

{{/*
Selector labels for the Postcard Generator workload.
*/}}
{{- define "postcardGenerator.selectorLabels" -}}
app.kubernetes.io/name: postcard-generator
app.kubernetes.io/instance: {{ .Values.tenant.name }}-postcard-generator
{{- end -}}

{{/*
Full hostname for a Route.
*/}}
{{- define "tenant.routeHost" -}}
postcard-{{ .Values.tenant.name }}.{{ .Values.deployer.domain }}
{{- end -}}
