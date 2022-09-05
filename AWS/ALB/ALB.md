![ALB](img/alb.png)
# Basics
- [AWS Homepage](https://aws.amazon.com/elasticloadbalancing/applicationloadbalancer/)
- [User Guide](https://aws.amazon.com/elasticloadbalancing/applicationloadbalancer/developer-resources/)
- [FAQ](https://aws.amazon.com/elasticloadbalancing/applicationloadbalancer/faqs/)
- [Pricing](https://aws.amazon.com/elasticloadbalancing/applicationloadbalancer/pricing/)
---
# New Update
-   **Websockets and HTTP/2** are [now supported](https://aws.amazon.com/blogs/aws/new-aws-application-load-balancer/).
-   **Internet Protocol Version 6 (IPv6)** is [now supported](https://aws.amazon.com/about-aws/whats-new/2017/01/announcing-internet-protocol-version-6-ipv6-support-for-elastic-load-balancing-in-amazon-virtual-private-cloud-vpc/).
-   **Load Balancing via IP** is [now supported](https://aws.amazon.com/about-aws/whats-new/2017/08/elastic-load-balancing-application-load-balancer-now-supports-load-balancing-to-ip-addresses-as-targets-for-aws-and-on-premises-resources/).
---
# Tips
- Use ALBs to route to services that are hosted on shared clusters with dynamic port assignment (like ECS or Mesos).
  ALBs support [HTTP host-based routing](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html#host-conditions) (send HTTP requests for “api.mydomain.com” -> {target-group-1}, “blog.mydomain.com” -> {target group 2}) as well as [HTTP path-based routing](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html#path-conditions) (send HTTP requests for “/api/*” -> {target-group-1}, “/blog/*” -> {target group 2}).
---
# Limit
- ALBs only support HTTP/2 over HTTPS (no plain-text HTTP/2).
- ALBs only support HTTP/2 to external clients and not to internal resources (instances/containers).
- ALBs support HTTP routing but not port-based TCP routing.
- Instances in the ALB’s target groups have to either have a single, fixed healthcheck port (“EC2 instance”-level healthcheck) or the healthcheck port for a target has to be the same as its application port (“Application instance”-level healthcheck) - you can't configure a per-target healthcheck port that is different than the application port.
- ALBs are VPC-only (they are not available in EC2 Classic)
- In a target group, if there is no healthy target, all requests are routed to all targets. For example, if you point a listener at a target group containing a single service that has a long initialization phase (during which the health checks would fail), requests will reach the service while it is still starting up.
- Although ALBs [now support SNI](https://aws.amazon.com/about-aws/whats-new/2017/10/elastic-load-balancing-application-load-balancers-now-support-multiple-ssl-certificates-and-smart-certificate-selection-using-server-name-indication-sni/), they only support 25 HTTPS certificates per Load Balancer. This limitation is not described [here](http://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-limits.html), so it might be subject to change.