export default {
  async fetch(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS,DELETE",
      "Access-Control-Allow-Headers": "*"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const pathname = url.pathname;

    if (pathname === "/login/") {
      return new Response("lldckv", {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8",
          ...corsHeaders
        }
      });
    }

    const idMatch = pathname.match(/^\/id\/([^\/]+)$/);
    if (idMatch) {
      const id = idMatch[1];

      try {
        const upstreamResponse = await fetch(`https://nd.kodaktor.ru/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": ""
          }
        });

        const data = await upstreamResponse.json();

        return new Response(String(data.login), {
          headers: {
            "Content-Type": "text/plain; charset=UTF-8",
            ...corsHeaders
          }
        });
      } catch (e) {
        return new Response(String(e), {
          status: 500,
          headers: {
            "Content-Type": "text/plain; charset=UTF-8",
            ...corsHeaders
          }
        });
      }
    }

    return new Response("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=UTF-8",
        ...corsHeaders
      }
    });
  }
};